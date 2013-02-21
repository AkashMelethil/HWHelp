package models;

import libs.Latexer;
import libs.GaussJordanReduction;

import models.MatrixOperationsRequest;

import Jama.*;

public class MatrixOperationsResponse {
	private String transpose;
	private String trace;
	private String rank;
	private String inverse;
	private String eigenValues;
	private String eigenVectors;
	private String determinant;
	private String lul;
	private String luu;
	private String lup;
	private String reduce;
	
	public MatrixOperationsResponse(MatrixOperationsRequest request) {	
		Latexer lat = new Latexer();
		Matrix mat = new Matrix(request.matrix());
		int rows = request.matrix().length;
		int cols = request.matrix()[0].length;
		boolean isDecimal = request.isDecimal();
		int decimalPlaces = request.decimalPlaces();
		
		//transpose
		if(request.transpose())
			this.transpose = lat.double2DToLatexString(mat.transpose().getArrayCopy(),isDecimal,decimalPlaces);
		
		//trace
		//The trace is only valid for square matrices
		if(request.trace()) {
			if(rows == cols)
				this.trace = lat.convertDoubleToLatexString(mat.trace(),isDecimal,decimalPlaces);
			else
				this.trace = "$$The\\:trace\\:of\\:a\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
		}
		
		//rank
		if(request.rank())
			this.rank = "$$"+Integer.toString(mat.rank())+"$$";
		
		//lu
		if(request.lu()) {
			if(rows == cols) {
				LUDecomposition lu = mat.lu();
				this.lul = lat.double2DToLatexString(lu.getL().getArray(),isDecimal,decimalPlaces);
				this.luu = lat.double2DToLatexString(lu.getU().getArray(),isDecimal,decimalPlaces);
				this.lup = lat.doubleVerticalVectorToLatexString(lu.getDoublePivot(),isDecimal,decimalPlaces);
			} else {
				this.lul = "$$The\\:L\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
				this.luu = "$$The\\:U\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
				this.lup = "$$The\\:P\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
			}
		}
		
		
		//inverse
		if(request.inverse()) {
			//The inverse is only valid for square matrices with a non-zero determinant
			if(rows == cols) {
				if(mat.det() == 0) {
					this.inverse = "$$The\\:inverse\\:of\\:a\\:matrix\\:is\\:not\\:defined\\:for\\:matrices\\:with\\:a\\:determinant\\:of\\:0.\\:The\\:input\\:matrix\\:is\\:singular.$$";
				} else {
					this.inverse = lat.double2DToLatexString(mat.inverse().getArray(),isDecimal,decimalPlaces);
				}
			} else {
				this.inverse = "$$The\\:inverse\\:of\\:a\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.\\:The\\:input\\:matrix\\:is\\:singular.$$";
			}
		}
		
		//eigen
		if(request.eigen()) {
			
			if(rows == cols) {
				EigenvalueDecomposition eigen = mat.eig();
				this.eigenValues = lat.convertEigenValuesToLatexString(eigen.getRealEigenvalues(),eigen.getImagEigenvalues(),isDecimal,decimalPlaces);
				this.eigenVectors = lat.doubleEigenVectorsToLatexString(eigen.getV().getArray(),isDecimal,decimalPlaces);
			}
			else {
				this.eigenValues = "$$The\\:eigen\\:values\\:of\\:a\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
				this.eigenVectors = "$$The\\:eigen\\:vectors\\:of\\:a\\:matrix\\:is\\:only\\:defined\\:if\\:the\\:corresponding\\:eigen\\:values\\:are\\:defined.$$";
			}
		}
		
		//determinant
		if(request.determinant()) {
			//The determinant is only valid for square matricies
			if(rows == cols)
				this.determinant = lat.convertDoubleToLatexString(mat.det(),isDecimal,decimalPlaces);
			else
				this.determinant = "$$The\\:determinant\\:of\\:a\\:matrix\\:is\\:only\\:defined\\:for\\:square\\:matrices.$$";
		}
		
		//reduce
		if(request.reduce()) {
			GaussJordanReduction gJR = new GaussJordanReduction();
			gJR.rowReduce(mat);
			this.reduce = lat.double2DToLatexString(mat.getArray(),isDecimal,decimalPlaces);
		}
	}
	
}



























