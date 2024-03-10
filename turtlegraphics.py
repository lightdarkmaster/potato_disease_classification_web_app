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


### NO NEED THIS CODE HERE..

def dictionary_attack(password):
    # Open the dictionary file
    with open('dictionary.txt', 'r') as f:
        # Read each line (password) from the dictionary
        for line in f:
            # Strip newline character and whitespace
            attempt = line.strip()
            # Check if the current password attempt matches the target password
            if attempt == password:
                print(f"Password cracked! The password is: {attempt}")
                return True
    # If no match is found
    print("Password not found in the dictionary.")
    return False

# Example usage
target_password = input("Enter the target password: ")
dictionary_attack(target_password)

def goleft():
	if head.direction != "right":
		head.direction = "left"
### END HERE...

## end of the code here...

print("done")
print("Nothing Follows here..")
print("#######################")
