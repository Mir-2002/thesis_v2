class Broccoli:
    """
    A class to represent broccoli.
    """

    def __init__(self, variety: str, weight: float):
        self.variety = variety
        self.weight = weight

    def steam(self, duration: int) -> str:
        """
        Steam the broccoli for a specified duration.

        :param duration: The duration to steam the broccoli in minutes.
        :return: A string indicating the broccoli is steamed.
        """
        return f"The {self.weight} kg {self.variety} broccoli is steamed for {duration} minutes."

    def chop(self) -> str:
        return f"The {self.weight} kg {self.variety} broccoli is chopped into pieces."

    def describe(self) -> str:
        """
        Describe the broccoli.
        """
        return f"This is a {self.weight} kg {self.variety} broccoli."

# Example usage
if __name__ == "__main__":
    # Create a Broccoli object
    broccoli = Broccoli(variety="Calabrese", weight=0.5)
    
    # Describe the broccoli
    print(broccoli.describe())
    
    # Steam the broccoli
    print(broccoli.steam(5))
    
    # Chop the broccoli
    print(broccoli.chop())