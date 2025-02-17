class Pork:
    def __init__(self, cut: str, weight: float):
        self.cut = cut
        self.weight = weight

    def marinate(self, duration: int) -> str:
        return f"The {self.weight} kg {self.cut} is marinated for {duration} hours."

    def describe(self) -> str:
        return f"This is a {self.weight} kg cut of {self.cut} pork."

# Example usage
if __name__ == "__main__":
    pork = Pork(cut="loin", weight=1.5)
    print(pork.describe())
    print(pork.marinate(4))