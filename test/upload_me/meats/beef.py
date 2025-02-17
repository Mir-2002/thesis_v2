class Beef:
    def __init__(self, cut: str, weight: float):
        self.cut = cut
        self.weight = weight

    def cook(self, style: str) -> str:
        return f"The {self.weight} kg {self.cut} is cooked {style} style."

    def describe(self) -> str:
        return f"This is a {self.weight} kg cut of {self.cut} beef."

# Example usage
if __name__ == "__main__":
    beef = Beef(cut="ribeye", weight=1.2)
    print(beef.describe())
    print(beef.cook("grilled"))