class Tart:
    """
    A class to represent a tart.
    """

    def __init__(self, filling: str, size: str):
        self.filling = filling
        self.size = size

    def bake(self, temperature: int) -> str:
        """
        Bake the tart at a specified temperature.

        :param temperature: The temperature to bake the tart at.
        :return: A string indicating the tart is baked.
        """
        return f"The {self.size} tart with {self.filling} filling is baked at {temperature} degrees."

    def decorate(self, decoration: str) -> str:
        return f"The {self.size} tart with {self.filling} filling is decorated with {decoration}."

    def describe(self) -> str:
        """
        Describe the tart.
        """
        return f"This is a {self.size} tart with {self.filling} filling."

# Example usage
if __name__ == "__main__":
    # Create a Tart object
    tart = Tart(filling="apple", size="medium")
    
    # Describe the tart
    print(tart.describe())
    
    # Bake the tart
    print(tart.bake(180))
    
    # Decorate the tart
    print(tart.decorate("whipped cream"))