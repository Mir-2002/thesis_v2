class Carrot:
    """
    A class to represent a carrot.
    """

    def __init__(self, length: float, weight: float):
        self.length = length
        self.weight = weight

    def peel(self) -> str:
        return f"The {self.length} cm carrot weighing {self.weight} kg is peeled."

    def chop(self) -> str:
        """
        Chop the carrot into pieces.
        """
        return f"The {self.length} cm carrot is chopped into pieces."

    def describe(self) -> str:
        return f"This is a {self.length} cm carrot weighing {self.weight} kg."

# Example usage
if __name__ == "__main__":
    # Create a Carrot object
    carrot = Carrot(length=15.0, weight=0.2)
    
    # Describe the carrot
    print(carrot.describe())
    
    # Peel the carrot
    print(carrot.peel())
    
    # Chop the carrot
    print(carrot.chop())