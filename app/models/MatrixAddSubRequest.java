package models;

public class MatrixAddSubRequest {
	private double[][] matrixA;
	private double[][] matrixB;
	private boolean isAdd;
	private boolean isDecimal;
	private int decimalPlaces;
	
	public double[][] matrixA(){
		return this.matrixA;
	}
	public double[][] matrixB(){
		return this.matrixB;
	}
	public boolean isAdd(){
		return this.isAdd;
	}
	public boolean isDecimal(){
		return this.isDecimal;
	}
	public int decimalPlaces(){
		return this.decimalPlaces;
	}
}