package libs;

import Jama.Matrix;
public class GaussJordanReduction {
	
	//This method uses the Gauss-Jordan algorithm
	public void rowReduce(Matrix mat) {
		int i = 0,j = 0;
		int cols = mat.getColumnDimension();
		int rows = mat.getRowDimension();
		
		while(!((i == rows) || (j == cols))) {
			/*
			Step 1.
			If aij = 0 swap the i-th row with some other row below to guarantee that aij does not equal 0.
			The non-zero entry in the (i, j)-position is called a pivot. If all entries in the column
			are zero, increase j by 1.
			*/
			if(i < rows && j < cols) {
				if(mat.get(i,j) == 0) {// && (i != rows-1)) {
					int l = i+1;
					while(l < rows){
						if(mat.get(l,j) != 0) {
							//SWAP l row and i row
							swapMatrixRows(mat,l,i,cols);
							break;
						}
						if(l == rows - 1) {
							++j;
						}
						++l;
					}
				}
			}
			/*
			Step 2.
			Divide the i-th row by aij to make the pivot entry = 1.
			*/
			if(i < rows && j < cols) {
				if(mat.get(i,j) != 1 && mat.get(i,j) != 0){
					double divisor = mat.get(i,j);
					for(int k = 0; k < cols; ++k) {
						mat.set(i,k,(mat.get(i,k)/divisor));
					}
				}
			}
			
			/*
			Step 3
			Eliminate all other entries in the j-th column by subtracting suitable multiples of the
			i-th row from the other rows.
			*/
			if(i < rows && j < cols) {
				if(mat.get(i,j) != 0){
					for(int k = 0; k < rows; ++k) {
						if(mat.get(k,j) != 0 && k != i) {
							subtractMultipleOfRow(mat,i,mat.get(i,j)*mat.get(k,j),k,cols);
						} 
					}
				}
			}
		
			/*
			Step 4
			Increase i by 1 and j by 1 to choose the new pivot element. Return to Step 1.
			*/
			++i;
			++j;
		}
		
	}
	
	private void swapMatrixRows(Matrix mat,int i,int j,int cols) {
		Matrix temp = mat.getMatrix(i,i,0,cols-1);
		for(int k = 0; k < cols; ++k) {
			mat.set(i,k,mat.get(j,k)); 
		}
		mat.setMatrix(j,j,0,cols-1,temp);
	}
	
	private void subtractMultipleOfRow(Matrix mat,int i,double mul,int j,int cols) {
		for(int k = 0; k < cols; ++k) {
			mat.set(j,k,(mat.get(j,k) - mat.get(i,k)*mul));
		}
	}
	//Used for testing only
	/*
	private void logMatrix(Matrix mat) {
		int cols = mat.getColumnDimension();
		int rows = mat.getRowDimension();
		
		String logString = "\n";
		for(int i = 0; i < rows; ++ i) {
			for(int j  = 0 ; j < cols; ++j) {
				logString += mat.get(i,j)+" ";
			}
			logString += "\n";
		}
		Logger.debug(logString);
	}
	*/
}