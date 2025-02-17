class Orange:
    """
    A class to represent an orange.
    """

    def __init__(self, variety: str, diameter: float):
        """
        Initialize an orange with variety and diameter.

        :param variety: The variety of the orange.
        :param diameter: The diameter of the orange in centimeters.
        """
        self.variety = variety
        self.diameter = diameter

    def peel(self) -> str:
        """
        Simulate peeling the orange.

        :return: A string indicating the orange is peeled.
        """
        return f"The {self.diameter} cm {self.variety} orange is peeled."

    def describe(self) -> str:
        """
        Describe the orange.

        :return: A string describing the orange.
        """
        return f"This is a {self.diameter} cm orange of the {self.variety} variety."

# Example usage
if __name__ == "__main__":
    orange = Orange(variety="Navel", diameter=8.5)
    print(orange.describe())
    print(orange.peel())