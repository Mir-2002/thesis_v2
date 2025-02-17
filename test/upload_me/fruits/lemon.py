class Lemon:
    """
    A class to represent a lemon.
    """

    def __init__(self, color: str, size: str):
        """
        Initialize a lemon with color and size.

        :param color: The color of the lemon.
        :param size: The size of the lemon.
        """
        self.color = color
        self.size = size

    def squeeze(self) -> str:
        """
        Simulate squeezing the lemon to get juice.

        :return: A string indicating the lemon juice is extracted.
        """
        return f"The {self.size} {self.color} lemon is squeezed and juice is extracted."

    def describe(self) -> str:
        """
        Describe the lemon.

        :return: A string describing the lemon.
        """
        return f"This is a {self.size} lemon with a {self.color} color."

# Example usage
if __name__ == "__main__":
    lemon = Lemon(color="yellow", size="medium")
    print(lemon.describe())
    print(lemon.squeeze())