package libs;

import java.math.BigDecimal;
public class Latexer {
	
	private  double round(double d, int decimalPlace) {
	    BigDecimal bd = new BigDecimal(d);//Double.toString(d));
	    bd = bd.setScale(decimalPlace, BigDecimal.ROUND_HALF_UP);
	    return bd.doubleValue();
	}
	
	private int findGCD(int a,int b) {
		if(a == 0)
			return b;
		while(b != 0) {
			if(a > b)
				a = a - b;
			else
				b = b - a;
		}
		return a;
	}
	private String convertDoubleToLatexFraction(double num) {
		BigDecimal newNum = new BigDecimal(num);
		newNum = newNum.setScale(3,BigDecimal.ROUND_HALF_UP);
		if(newNum.compareTo(new BigDecimal(newNum.intValue())) == 0)
			return Integer.toString(newNum.intValue());
		boolean isNegative = newNum.signum() == -1? true:false;
		if(isNegative)
			newNum = newNum.multiply(new BigDecimal(-1));
		int whole = newNum.intValue();
		BigDecimal rest = newNum.subtract(new BigDecimal(whole));
		rest = rest.setScale(3,BigDecimal.ROUND_HALF_UP);
		int ctr = 0;
		while(rest.compareTo(new BigDecimal(rest.intValue())) != 0) {
			rest = rest.multiply(new BigDecimal(10));
			++ctr;
		}
		int denominator = (int)Math.pow(10,ctr);
		int gcd = findGCD(rest.intValue(),denominator);
		denominator = denominator/gcd;
		int numerator = (rest.intValue()/gcd)+(whole*denominator);
		return "\\frac{"+ (isNegative? numerator*-1:numerator) +"}{"+ denominator +"}";
	}
	
	
	public String double2DToLatexString(double[][] arr,boolean isDecimal,int decimalPlaces) {
		int rows = arr.length;
		int cols = arr[0].length;
		String latexStr = "\\begin{bmatrix}";
		for(int i = 0; i < rows; ++i) {
			for(int j = 0; j < cols; ++j) {	
				double num = arr[i][j];
				if(isDecimal == false){
					if(j == (cols - 1))
						latexStr += convertDoubleToLatexFraction(num);
					else
						latexStr += convertDoubleToLatexFraction(num)+"&";
				}
				else{
					if(j == (cols - 1))
						latexStr += round(num,decimalPlaces);
					else
						latexStr += round(num,decimalPlaces)+"&";
				}
			}
			latexStr += "\\\\";
		}
		latexStr += "\\end{bmatrix}";
		return latexStr;
	}
	
	public String convertDoubleToLatexString(double num,boolean isDecimal,int decimalPlaces) {
		return isDecimal? ("$$"+Double.toString(round(num,decimalPlaces))+"$$"): ("$$"+convertDoubleToLatexFraction(num)+"$$");
	}
	
	public String convertEigenValuesToLatexString(double[] re,double[] im,boolean isDecimal,int decimalPlaces) {
		int valCount = re.length;
		String latexStr = "$$";
		for(int i = 0; i < valCount; ++i){
			if(isDecimal == false){
				if(i == (valCount - 1))
					latexStr += "\\:\\lambda_"+(i+1)+"="+convertDoubleToLatexFraction(re[i])+""+((im[i] != 0)? ("+"+convertDoubleToLatexFraction(im[i])+"i"):"");              
				else
					latexStr += "\\:\\lambda_"+(i+1)+"="+convertDoubleToLatexFraction(re[i])+""+((im[i] != 0)? ("+"+convertDoubleToLatexFraction(im[i])+"i"):"")+",";
			}
			else{
				
				if(i == (valCount - 1))
					latexStr += "\\:\\lambda_"+(i+1)+"="+round(re[i],decimalPlaces)+""+((im[i] != 0)? ("+"+round(im[i],decimalPlaces)+"i"):"");              
				else
					latexStr += "\\:\\lambda_"+(i+1)+"="+round(re[i],decimalPlaces)+""+((im[i] != 0)? ("+"+round(im[i],decimalPlaces)+"i"):"")+",";
			}
		}
		latexStr += "$$";
		return latexStr;	
	}
	
	public String doubleEigenVectorsToLatexString(double[][] arr,boolean isDecimal,int decimalPlaces) {
		int rows = arr.length;
		int cols = arr[0].length;
		String latexStr = "$$";
		for(int i = 0; i < cols; ++i) {
			latexStr += "v_"+(i+1)+"=\\begin{bmatrix}";
			for(int j = 0; j < rows; ++j) {
				if(isDecimal == false)
					latexStr += convertDoubleToLatexFraction(arr[j][i])+"\\\\";
				else
					latexStr += round(arr[j][i],decimalPlaces)+"\\\\";	
			}
			latexStr += "\\end{bmatrix}\\;";
		}
		latexStr += "$$";
		return latexStr;
	}
	
	public String doubleVerticalVectorToLatexString(double[] arr,boolean isDecimal,int decimalPlaces) {
		int rows = arr.length;
		String latexStr = "$$\\begin{bmatrix}";
		for(int i = 0; i < rows; ++i) {
			if(isDecimal == false)
				latexStr += convertDoubleToLatexFraction(arr[i])+"\\\\";
			else
				latexStr += round(arr[i],decimalPlaces)+"\\\\";	
		}
		latexStr += "\\end{bmatrix}\\;$$";
		return latexStr;
	}
	
	public String double2DSolveToLatexString(double[][] arr,boolean isDecimal,int decimalPlaces) {
		int valCount = arr.length;
		String latexStr = "$$";
		for(int i = 0; i < valCount; ++i){
			if(isDecimal == false){
				if(i == (valCount - 1))
					latexStr += "\\:x_"+(i+1)+"="+convertDoubleToLatexFraction(arr[i][0]);              
				else
					latexStr += "\\:x_"+(i+1)+"="+convertDoubleToLatexFraction(arr[i][0])+",";
			}
			else{
				
				if(i == (valCount - 1))
					latexStr += "\\:x_"+(i+1)+"="+round(arr[i][0],decimalPlaces);             
				else
					latexStr += "\\:x_"+(i+1)+"="+round(arr[i][0],decimalPlaces)+",";
			}
		}
		latexStr += "$$";
		return latexStr;
	}
}









