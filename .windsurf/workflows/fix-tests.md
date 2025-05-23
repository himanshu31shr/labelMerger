---
description: Fix test cases
---

Run the memory workflow to create the memory of the project and use sequential thinking for creating an outline for the required test cases.

If tests doesn't exists do a minimal setup and start writing the test cases, make sure to do following when writing new test cases.
1. Write tests one at a time such that write on test case then pass it; when passed move on to next. Do not write multiple test cases at once.
2. Make sure to follow tdd rules when writing tests.
3. Always proceed to next test if and only if all previous cases are passing
4. Add mocks for apis, data layers and other third party libraries.
5. Make sure to have coverage more than 80%
6. When all tests are passing commit the changes.

if tests already exists do this: 
Make sure following:
1. All tests are always passing.
2. Add mocks for apis, data layers and other third party libraries.
3. Make sure to have coverage more than 80%
4. When all tests are passing commit the changes.