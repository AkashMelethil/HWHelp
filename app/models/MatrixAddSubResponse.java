package models;

import libs.Latexer;

import models.MatrixAddSubRequest;

import Jama.Matrix;

public class MatrixAddSubResponse {
	private String solution;
	
	
	public MatrixAddSubResponse(MatrixAddSubRequest request) {
		Latexer lat = new Latexer();
		Matrix matA = new Matrix(request.matrixA());
		Matrix matB = new Matrix(request.matrixB());
		boolean isDecimal = request.isDecimal();
		int decimalPlaces = request.decimalPlaces();
		
		//Adding
		if(request.isAdd())
			this.solution = lat.double2DToLatexString(matA.plus(matB).getArray(),isDecimal,decimalPlaces);
		//Subtracting
		else
			this.solution = lat.double2DToLatexString(matA.minus(matB).getArray(),isDecimal,decimalPlaces);
	}
	
}



























