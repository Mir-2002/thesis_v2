class Donut:
    """
    A class to represent a donut.
    """

    def __init__(self, flavor: str, size: str):
        self.flavor = flavor
        self.size = size

    def fry(self) -> str:
        return f"The {self.size} {self.flavor} donut is fried to perfection."

    def glaze(self, type_of_glaze: str) -> str:
        """
        Apply glaze to the donut.

        :param type_of_glaze: The type of glaze to apply.
        :return: A string indicating the donut is glazed.
        """
        return f"The {self.size} {self.flavor} donut is glazed with {type_of_glaze}."

    def describe(self) -> str:
        return f"This is a {self.size} donut with a {self.flavor} flavor."

# Example usage
if __name__ == "__main__":
    donut = Donut(flavor="chocolate", size="large")
    print(donut.describe())
    print(donut.fry())
    print(donut.glaze("vanilla"))