package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.BodyParser;

import play.libs.Json;
import play.libs.Json.*;
import play.libs.Akka;
import play.libs.F;
import play.libs.F.*;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import com.google.gson.Gson;

import models.*;

import views.html.*;

import java.util.concurrent.Callable;

public class Application extends Controller {

	//Static
	public static Result index() {
		return ok(index.render());
	}
	
	public static Result support() {
		return ok(support.render());
	}
	
	public static Result about() {
		return ok(about.render());
	}

	public static Result matrixCalculator() {
		return ok(matrixCalculator.render());
	}
	//END Static
	
	//ASYNC
	@BodyParser.Of(play.mvc.BodyParser.Json.class)
	public static Result matrixOperationsSolution() {	
		//Getting JSON and Organizing
		JsonNode json = request().body().asJson();
		if(json == null)
			return badRequest("Expecting JSON");
		final Gson gson = new Gson();
		final MatrixOperationsRequest operationsRequest = gson.fromJson(json.toString(),MatrixOperationsRequest.class);
		
		//Building Reponse Asynchronously
		Promise<MatrixOperationsResponse> promiseOfMatrixOperationsResponse = Akka.future(
			new Callable<MatrixOperationsResponse>() {
				public MatrixOperationsResponse call() {
					return new MatrixOperationsResponse(operationsRequest);
				}
			}
		);
		
		//Sending Result
		return async(
			promiseOfMatrixOperationsResponse.map(
				new Function<MatrixOperationsResponse,Result>() {
					public Result apply(MatrixOperationsResponse res) {
						return ok(gson.toJson(res));
					}
				}
			)
		);
	}
	
	//ASYNC
	@BodyParser.Of(play.mvc.BodyParser.Json.class)
	public static Result matrixMultiplicationSolution() {
		//Getting JSON and Organizing
		JsonNode json = request().body().asJson();
		if(json == null)
			return badRequest("Expecting JSON");
		final Gson gson = new Gson();
		final MatrixMultiplicationRequest request = gson.fromJson(json.toString(),MatrixMultiplicationRequest.class);
		
		//Building Reponse Asynchronously
		Promise<MatrixMultiplicationResponse> promiseOfMatrixMultiplicationResponse = Akka.future(
			new Callable<MatrixMultiplicationResponse>() {
				public MatrixMultiplicationResponse call() {
					return new MatrixMultiplicationResponse(request);
				}
			}
		);
		
		//Sending Result
		return async(
			promiseOfMatrixMultiplicationResponse.map(
				new Function<MatrixMultiplicationResponse,Result>() {
					public Result apply(MatrixMultiplicationResponse res) {
						return ok(gson.toJson(res));
					}
				}
			)
		);
	}
	
	@BodyParser.Of(play.mvc.BodyParser.Json.class)
	public static Result matrixAddSubSolution() {
		//Getting JSON and Organizing
		JsonNode json = request().body().asJson();
		if(json == null)
			return badRequest("Expecting JSON");
		final Gson gson = new Gson();
		final MatrixAddSubRequest request = gson.fromJson(json.toString(),MatrixAddSubRequest.class);
		
		//Building Reponse Asynchronously
		Promise<MatrixAddSubResponse> promiseOfMatrixAddSubResponse = Akka.future(
			new Callable<MatrixAddSubResponse>() {
				public MatrixAddSubResponse call() {
					return new MatrixAddSubResponse(request);
				}
			}
		);
		
		//Sending Result
		return async(
			promiseOfMatrixAddSubResponse.map(
				new Function<MatrixAddSubResponse,Result>() {
					public Result apply(MatrixAddSubResponse res) {
						return ok(gson.toJson(res));
					}
				}
			)
		);
	}
	
	@BodyParser.Of(play.mvc.BodyParser.Json.class)
	public static Result matrixSolveSolution() {
		//Getting JSON and Organizing
		JsonNode json = request().body().asJson();
		if(json == null)
			return badRequest("Expecting JSON");
		final Gson gson = new Gson();
		final MatrixSolveRequest request = gson.fromJson(json.toString(),MatrixSolveRequest.class);
		
		//Building Reponse Asynchronously
		Promise<MatrixSolveResponse> promiseOfMatrixSolveResponse = Akka.future(
			new Callable<MatrixSolveResponse>() {
				public MatrixSolveResponse call() {
					return new MatrixSolveResponse(request);
				}
			}
		);
		
		//Sending Result
		return async(
			promiseOfMatrixSolveResponse.map(
				new Function<MatrixSolveResponse,Result>() {
					public Result apply(MatrixSolveResponse res) {
						return ok(gson.toJson(res));
					}
				}
			)
		);
	}

}