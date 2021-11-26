export default class CpfValidator {
    private cpf: string;
    private numberBaseToCalcCheckDigit = 11;

    constructor(cpf: string) {
        this.cpf = cpf;
    }

    validate(): boolean {
        if (this.cpf.length == 0) return false;
        if (this.cpf.length < this.numberBaseToCalcCheckDigit || this.cpf.length > 14) return false;
        this.cpf = this.replaceAll(this.replaceAll(this.cpf, ".", ""), "-", "");
        if (this.cpf.split("").every(eachCpfDigit => eachCpfDigit === this.cpf[0])) return false;
        try{
            const lastCheckDigitsFromCpf = this.cpf.substring(this.cpf.length-2, this.cpf.length);  
            return lastCheckDigitsFromCpf == this.getLastTwoCheckDigits();
        }catch (e){
            console.error("Erro !"+e);  
            return false;  
        }  
    }

    getLastTwoCheckDigits(): string{
        let calcForFirstCheckDigit, calcForSecondCheckDigit: number;
        let firstCheckDigit, secondCheckDigit: number; 

        calcForFirstCheckDigit = this.getResultToBeCalculatedWithRestOfDivision(this.numberBaseToCalcCheckDigit);
        calcForSecondCheckDigit = this.getResultToBeCalculatedWithRestOfDivision(this.numberBaseToCalcCheckDigit + 1);
        firstCheckDigit = this.calcCheckDigitFromRestOfDivision(calcForFirstCheckDigit);
        calcForSecondCheckDigit += 2 * firstCheckDigit;  
        secondCheckDigit =  this.calcCheckDigitFromRestOfDivision(calcForSecondCheckDigit);
        return "" + firstCheckDigit + secondCheckDigit;
    }

    getResultToBeCalculatedWithRestOfDivision(numberBaseToStartPosition: number): number {
        let cpfDigit: number;
        let resultedFromSum = 0;

        for (let nCount = 1; nCount < this.cpf.length -1; nCount++) {  
            cpfDigit = parseInt(this.cpf.substring(nCount -1, nCount));  							
            resultedFromSum += (numberBaseToStartPosition - nCount ) * cpfDigit;  
        }
        return resultedFromSum;
    }

    calcCheckDigitFromRestOfDivision(resultSumForCheckDigit: number): number {
        let restOfDivision = (resultSumForCheckDigit % this.numberBaseToCalcCheckDigit);  
        
        return (restOfDivision < 2) ? 0 : this.numberBaseToCalcCheckDigit - restOfDivision;
    }

    replaceAll(stringToFind: string, find: string, replace: string): string {
        var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return stringToFind.replace(new RegExp(escapedFind, 'g'), replace);
    }
}