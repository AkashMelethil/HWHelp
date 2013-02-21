package models;

import libs.Latexer;

import models.MatrixMultiplicationRequest;

import Jama.Matrix;

public class MatrixMultiplicationResponse {
	private String solution;
	
	
	public MatrixMultiplicationResponse(MatrixMultiplicationRequest request) {
		Latexer lat = new Latexer();
		Matrix matA = new Matrix(request.matrixA());
		Matrix matB = new Matrix(request.matrixB());
		boolean isDecimal = request.isDecimal();
		int decimalPlaces = request.decimalPlaces();
		
		//multiplying
		//Assuming that the matrix has the right dimensions
		this.solution = lat.double2DToLatexString(matA.times(matB).getArray(),isDecimal,decimalPlaces);
		
	}
	
}



























