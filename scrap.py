
# install:
#
# pip install python-leetcode
#
# url: https://pypi.org/project/python-leetcode/
#
# use:
# ```
# python scrap.py title_slug
# ```
# you can find title_slug from url.
# like
# https://leetcode.com/problems/sum-of-mutated-array-closest-to-target/
# slug is "sum-of-mutated-array-closest-to-target"
# ```
# python scrap.py "sum-of-mutated-array-closest-to-target"
# ```


import sys
import leetcode
import leetcode.auth
from lxml import etree
import json
# you should create config.py yourself.
# it contains only the following two variables.
# open the following url from chrome to check the following two variable
# chrome://settings/cookies/detail?site=leetcode.com
from config import leetcode_session, csrf_token

title_slug = sys.argv[1]
title_slug = title_slug.replace('https://leetcode.com/problems/', '')
title_slug = title_slug.replace('/', '')

question_type = ''
if len(sys.argv) >= 3:
    question_type = sys.argv[2]


def get_api_instance(leetcode_session, csrf_token):
    csrf_token = leetcode.auth.get_csrf_cookie(leetcode_session)

    configuration = leetcode.Configuration()

    configuration.api_key["x-csrftoken"] = csrf_token
    configuration.api_key["csrftoken"] = csrf_token
    configuration.api_key["LEETCODE_SESSION"] = leetcode_session
    configuration.api_key["Referer"] = "https://leetcode.com"
    configuration.debug = False

    api_instance = leetcode.DefaultApi(leetcode.ApiClient(configuration))
    return api_instance


api_instance = get_api_instance(leetcode_session, csrf_token)


def get_detail(title_slug):
    graphql_request = leetcode.GraphqlQuery(
        query="""
            query getQuestionDetail($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                content
                codeDefinition
              }
            }
        """,
        variables=leetcode.GraphqlQueryGetQuestionDetailVariables(title_slug),
        operation_name="getQuestionDetail",
    )

    result = api_instance.graphql_post(body=graphql_request)
    return result.data.question


question = get_detail(title_slug)

question_id = question.question_frontend_id
question_title = question.title
if question_type == '' and 'Design' in question_title:
    question_type = 'Design'
    print("It is a design question.")
elif question_type == '':
    question_type = 'Common'

code_definitions = json.loads(question.code_definition)
typescript = [d for d in code_definitions if d['value'] == 'typescript'][0]


def get_code_snippet(typescript_code):
    print(typescript_code)
    print(len(typescript_code))
    func_at = typescript_code.find('function ')
    open_at = typescript_code.find('(')
    close_at = typescript_code.find(')')
    open_brace_at = typescript_code.find('{')
    function_name = typescript_code[func_at+8:open_at]
    typed_params = typescript_code[open_at+1:close_at].strip()
    params = typed_params.split(',')
    untyped_params = ''
    for i in range(0, len(params)):
        name_type = params[i].split(':')
        untyped_params = name_type[0] + ', '
    untyped_params = untyped_params.strip().strip(',')
    print(close_at+1, open_brace_at)
    print(typescript_code[close_at+1: open_brace_at])
    return_type = typescript_code[close_at+1: open_brace_at].strip().strip(':')
    return function_name, typed_params, untyped_params, return_type, typescript_code


function_name, typed_params, untyped_params, return_type, typescript_code = get_code_snippet(
    typescript['defaultCode'])

html = etree.HTML(question.content)


def get_params(tc):
    tc_string = tc.xpath('string()')
    # get input
    inputAt = tc_string.find('Input')
    outputAt = tc_string.find('Output')
    inputString = tc_string[inputAt+5:outputAt]
    inputString = inputString.strip(':')
    inputString = inputString.strip()
    inputString = inputString.strip('\n')
    inputString = inputString.replace('\n', ', ')
    while '=' in inputString:
        equalAt = inputString.find('=')
        commaAt = equalAt - 1
        while commaAt > 0:
            if inputString[commaAt] == ',':
                break
            commaAt -= 1
        inputString = inputString[:commaAt] + ', ' + inputString[equalAt+1:]
    inputString = inputString.strip(',')
    inputString = inputString.strip()
    # get output
    explanationAt = tc_string.find('Explanation')
    outputString = tc_string[outputAt+6:explanationAt]
    outputString = outputString.strip(':')
    outputString = outputString.strip()
    return inputString+', '+outputString


def get_test_case_code(html):
    test_cases = html.xpath("//pre")
    test_case_string = ''
    for i, tc in enumerate(test_cases):
        params = get_params(tc)
        test_case_string = f"{test_case_string}\n    it('{question_id}. {i+1}', () => {{test({params})}});"
    return test_case_string


test_case_string = get_test_case_code(html)

test_function_code = ''
if question_type == 'Common':
    test_function_code = f"""function test({typed_params}, expected: {return_type}) {{
    const actual = {function_name} ({untyped_params});
    if (actual !== expected) {{
        console.log(actual, expected);
    }}
    expect(actual).to.be.eql(expected);
}}"""
else:
    open_at = test_case_string.find('[')
    close_at = test_case_string.find(']')
    method_name_string = test_case_string[open_at+1:close_at]
    method_name_string = method_name_string.replace('"', '')
    method_names = method_name_string.split(',')
    class_name = method_names[0]
    method_name_set = set()
    for i in range(1, len(method_names)):
        method_name_set.add(method_names[i].strip())
    case_code = ''
    for method_name in method_name_set:
        case_code += f"""            case '{method_name}':
                expect(obj.{method_name}(...params[i])).to.be.eql(expected[i]);
                break;
"""

    test_function_code = f"""
function test(actions: string[], params: Array, expected: Array) {{
    const obj = new {class_name}(...params[0]);
    for (let i=1;i<actions.length;i++) {{
        switch(actions[i]) {{
{case_code}
        }}
    }}
}}"""

code = f"""
import {{ expect }} from "chai";
import * as _ from 'lodash';

{typescript_code}

{test_function_code}

describe('{question_id}. {question_title}', () => {{
{test_case_string}    
}});

"""

with open(f'test/{question_id}. {question_title}.ts', mode='w') as f:
    f.write(code)

print(f'{question_id}. {question_title} done')
