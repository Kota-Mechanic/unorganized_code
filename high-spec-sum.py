# coding=utf8

def findSum(str1):
 
    # A temporary string
    temp = "0"
 
    # holds sum of all numbers
    # present in the string
    Sum = 0
 
    # read each character in input string
    for ch in str1:
 
        # if current character is a digit
        if (ch.isdigit()):
            temp += ch
 
        # if current character is an alphabet
        else:
 
            # increment Sum by number found
            # earlier(if any)
            Sum += int(temp)
 
            # reset temporary string to empty
            temp = "0"
 
    # atoi(temp.c_str1()) takes care
    # of trailing numbers
    return Sum + int(temp)
  
# input alphanumeric string
str1 = input(str())
# Function call
print(findSum(str1))
