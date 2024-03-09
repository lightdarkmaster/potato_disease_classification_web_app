import turtle

win = turtle.Screen()
win.title("Hello World")
win.bgcolor("light blue")

turta = turtle.Turtle()  # I gave the name turta for my turtle
turta.color("black")  # make turta black (default color)
turta.pensize(4)  # set the width of turta as 4
turta.speed(20)

# Print the letter H
turta.penup()
turta.goto(-320, 0)
turta.pendown()
turta.left(90)
turta.forward(70)
turta.penup()
turta.goto(-320, 35)
turta.down()
turta.right(90)
turta.forward(50)
turta.penup()
turta.goto(-270, 70)
turta.pendown()
turta.right(90)
turta.forward(70)

# printing letter E
turta.penup()
turta.goto(-260, 0)
turta.pendown()
turta.right(180)
turta.forward(70)
turta.right(90)
turta.forward(35)
turta.penup()
turta.goto(-260, 35)
turta.pendown()
turta.forward(35)
turta.penup()
turta.goto(-260, 0)
turta.pendown()
turta.forward(35)

# printing letter L
turta.penup()
turta.goto(-210, 70)
turta.pendown()
turta.right(90)
turta.forward(70)
turta.left(90)
turta.forward(35)

# printing letter L
turta.penup()
turta.goto(-165, 70)
turta.pendown()
turta.right(90)
turta.forward(70)
turta.left(90)
turta.forward(35)

# printing letter O
turta.penup()
turta.goto(-90, 70)
turta.pendown()

for i in range(25):
    turta.right(15)
    turta.forward(10)

# printing  letter w
turta.penup()
turta.goto(-10, 70)
turta.pendown()
turta.right(55)
turta.forward(70)
turta.left(150)
turta.forward(70)
turta.right(155)
turta.forward(70)
turta.left(150)
turta.forward(70)

# printing letter O
turta.penup()
turta.goto(70, 55)
turta.pendown()

for i in range(25):
    turta.right(15)
    turta.forward(10)

# printing letter R
turta.penup()
turta.goto(160, 70)
turta.pendown()
turta.right(150)
turta.forward(70)
turta.goto(160, 70)
turta.right(200)
for i in range(20):
    turta.right(15)
    turta.forward(6)
turta.left(180)
turta.forward(60)

# printing letter L
turta.penup()
turta.goto(220, 70)
turta.pendown()
turta.right(40)
turta.forward(70)
turta.left(90)
turta.forward(35)

# printing letter L
turta.penup()
turta.goto(290, 70)
turta.pendown()
turta.right(90)
turta.forward(70)
turta.penup()
turta.goto(270, 70)
turta.pendown()
turta.left(120)

for i in range(15):
    turta.right(15)
    turta.forward(10)

turtle.done()
