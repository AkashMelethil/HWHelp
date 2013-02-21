package models;

import libs.Latexer;

import models.MatrixSolveRequest;

import Jama.Matrix;

public class MatrixSolveResponse {
	private String solution;
	
	
	public MatrixSolveResponse(MatrixSolveRequest request) {
		Latexer lat = new Latexer();
		Matrix matA = new Matrix(request.matrixA());
		Matrix matB = new Matrix(request.matrixB());
		boolean isDecimal = request.isDecimal();
		int decimalPlaces = request.decimalPlaces();
		
		//solving
		try {
			this.solution = lat.double2DSolveToLatexString(matA.solve(matB).getArray(),isDecimal,decimalPlaces);
		} catch(Exception e) {
			this.solution = "$$The\\:matrix\\:is\\:singular\\:and\\:has\\:infinite\\:solutions.$$";
		}
		
		
	}
	
}



























