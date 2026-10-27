
class Cheese {
	private number1: number = 0;
	private number2: number = 0;

	constructor(numbers: number[]) {
		this.number1 = numbers[0];
		this.number2= numbers[1];
	};

	add() {
		return this.number1 + this.number2;
	}

	divide() {
		return this.number1 / this.number2;
	}

	compounding() {
		return this.add() / this.divide();
	}

	favorite() {
		return `My favorite number is ${this.number1}, and my second favorite is ${this.number2}`;
	}
}

const firstNumber = Number(prompt("First Number:", "100"));
const secondNumber = Number(prompt("Second Number:", "20"));
// Additional way to do user input:
// const quantity: number = Number(Deno.args[0]);
const inputs = [firstNumber, secondNumber];
const myClass = new Cheese(inputs)

console.log(`Inputs: ${inputs}`);
console.log(`Sum: ${myClass.add()}`);
console.log(`Dividend: ${myClass.divide()}`);
console.log(`Fave: ${myClass.favorite()}`);
console.log(`Compounding 🤯: ${myClass.compounding()}`);
