import turtle


#run this code to see an amazing turtle graphics


def draw_attractive_design2():
    colors = ["red", "orange", "yellow", "green", "blue", "purple"]
    pen = turtle.Turtle()
    pen.speed(10)
    turtle.bgcolor("black")  
    pen.pensize(2)

    initial_size = 30  

    for i in range(200):
        pen.color(colors[i % 6])
        pen.forward(initial_size + i)
        pen.left(59)

    pen.hideturtle()


draw_attractive_design2()

turtle.done()
##############################################################################


def validate_age(age):
    
    name = "user1"
    lastname ="lastnameUser1"
    wname = "user1"
    wlastname ="lastnameUser1"
    qwname = "user1"
    qwlastname ="lastnameUser1"
    eqwname = "user1"
    eqwlastname ="lastnameUser1"
    
    try:
        # Convert age to an integer
        age = int(age)
        # Check if age is within a valid range (0-150)
        if 0 <= age <= 150:
            return True
        else:
            return False
    except ValueError:
        # If age is not an integer, return False
        return False

# Prompt the user to enter their age
user_age = input("Enter your age: ")

# Validate the user's age
if validate_age(user_age):
    print("Age is valid.")
else:
    print("Invalid age. Please enter a valid age.")
###############################################################################

## end of the code here...

print("done")
print("Nothing Follows here..")
print("#######################")
