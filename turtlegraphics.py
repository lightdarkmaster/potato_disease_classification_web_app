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

### END HERE...

## end of the code here...

print("done")
print("Nothing Follows here..")
print("#######################")
