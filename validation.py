def validate_age(age):
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
