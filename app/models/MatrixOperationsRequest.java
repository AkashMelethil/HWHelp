package models;

public class MatrixOperationsRequest {
	private double[][] matrix;
	private boolean transpose;
	private boolean trace;
	private boolean rank;
	private boolean lu;
	private boolean inverse;
	private boolean eigen;
	private boolean determinant;
	private boolean reduce;
	private boolean isDecimal;
	private int decimalPlaces;
	
	public double[][] matrix(){
		return this.matrix;
	}
	public boolean transpose(){
		return this.transpose;
	}
	public boolean trace(){
		return this.trace;
	}
	public boolean rank(){
		return this.rank;
	}
	public boolean lu(){
		return this.lu;
	}
	public boolean inverse(){
		return this.inverse;
	}
	public boolean eigen(){
		return this.eigen;
	}
	public boolean determinant(){
		return this.determinant;
	}
	public boolean reduce(){
		return this.reduce;
	}
	public boolean isDecimal(){
		return this.isDecimal;
	}
	public int decimalPlaces(){
		return this.decimalPlaces;
	}
}