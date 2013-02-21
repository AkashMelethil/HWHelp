window.App = Em.Application.create({
	ApplicationView: Em.View.extend({
		templateName: 'application',
		didInsertElement: function() {
			$("div#spinner-div").hide();
			App.spinner = new Spinner({			
		      lines: 12, // The number of lines to draw
			  length: 8, // The length of each line
			  width: 5, // The line thickness
			  radius: 11, // The radius of the inner circle
			  corners: 0, // Corner roundness (0..1)
			  rotate: 90, // The rotation offset
			  color: '#667E72', // #rgb or #rrggbb
			  speed: 1.5, // Rounds per second
			  trail: 100, // Afterglow percentage
			  shadow: false, // Whether to render a shadow
			  hwaccel: false, // Whether to use hardware acceleration
			  className: 'spinner', // The CSS class to assign to the spinner
			  zIndex: 2e9, // The z-index (defaults to 2000000000)
			  top: 'auto', // Top position relative to parent in px
			  left: 'auto' // Left position relative to parent in px
			
			}).spin(document.getElementById("spinner-div"));
		}
	}),
	ApplicationController: Em.Controller.extend({
		title: 'Matrix Calculator',
		isTitle: true
	}),
	MatrixOperationsView: Em.View.extend({
		templateName: 'matrix-operations',
		didInsertElement: function() {
			App.slider = $('#slider-container').bxSlider({
			    controls: false,
				speed:0,
				pager: false,
				slideSelector: "div.white-background",
				infiniteLoop: false,
				touchEnabled: false,
				ticker: false,
				startSlide: 0
			});
			$("div#slider-container div.white-background:first-of-type").remove();
			App.slider.goToFirstSlide();
			App.slider.setSpeed(250);
		}
	}),
	MatrixOperationsController: Em.Controller.extend({
		title: 'Matrix Calculator: Operations',
		rows: 3,
		cols: 3,
		testNumber: function(string) {
			//Test does not include complex numbers
			var regex = /((0|([1-9]0|[1-9]*).0|[1-9]*|.0|[1-9]+)[eE][+-]?0|[1-9]+?)|(0|([1-9]0|[1-9]*)[eE][+-]?0|[1-9]+)/;
			return regex.test(string);
		},
		getMatrixData: function(){
			var arrayReady = true;
			var rows = this.get("rows");
			var cols = this.get("cols");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		transpose: false,
		trace: false,
		rank: false,
		lu: false,
		inverse: false,
		eigen: false,
		determinant: false,
		reduce: false,
		resultFormating: 'decimal',
		isDecimal: function() {
			return this.get("resultFormating") == "decimal"? true:false;
		}.property('resultFormating'),
		decimalPlaces: Em.Object.create({
			selected: 2,
			content: [1,2,3,4,5,6,7,8,9,10]
		}),
		getData: function() {
			var matrixOperationsData = {
				matrix: this.getMatrixData(),
				transpose: this.get("transpose"),
				trace: this.get("trace"),
				rank: this.get("rank"),
				lu: this.get("lu"),
				inverse: this.get("inverse"),
				eigen: this.get("eigen"),
				determinant: this.get("determinant"),
				reduce: this.get("reduce"),
				isDecimal: this.get("isDecimal"),
				decimalPlaces: this.get("decimalPlaces").get("selected"),
			}
			return matrixOperationsData;
		},
		solution: Em.Object.create(),
		showSol: false,
	}),
	MatrixMulView: Em.View.extend({
		templateName: 'matrix-multiplication',
		didInsertElement: function() {
			App.slider = $('#slider-container').bxSlider({
			    controls: false,
				speed:0,
				pager: false,
				slideSelector: "div.white-background",
				infiniteLoop: false,
				touchEnabled: false,
				ticker: false,
				startSlide: 0
			});
			$("div#slider-container div.white-background:first-of-type").remove();
			App.slider.goToFirstSlide();
			App.slider.setSpeed(250);
		}
	}),
	MatrixMulController: Em.Controller.extend({
		title: 'Matrix Calculator: Multiplication',
		rowsA: 3,
		colsARowsB: 3,
		colsB: 3,
		resultFormating: 'decimal',
		isDecimal: function() {
			return this.get("resultFormating") == "decimal"? true:false;
		}.property('resultFormating'),
		decimalPlaces: Em.Object.create({
			selected: 2,
			content: [1,2,3,4,5,6,7,8,9,10]
		}),
		testNumber: function(string) {
			//Test does not include complex numbers
			var regex = /((0|([1-9]0|[1-9]*).0|[1-9]*|.0|[1-9]+)[eE][+-]?0|[1-9]+?)|(0|([1-9]0|[1-9]*)[eE][+-]?0|[1-9]+)/;
			return regex.test(string);
		},
		getMatrixAData: function(){
			var arrayReady = true;
			var rows = this.get("rowsA");
			var cols = this.get("colsARowsB");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-a-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getMatrixBData: function(){
			var arrayReady = true;
			var rows = this.get("colsARowsB");
			var cols = this.get("colsB");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-b-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getData: function() {
			var matrixMulData = {
				matrixA: this.getMatrixAData(),
				matrixB: this.getMatrixBData(),
				isDecimal: this.get("isDecimal"),
				decimalPlaces: this.get("decimalPlaces").get("selected"),
			}
			return matrixMulData;
		},
		solution: null
	}),
	MatrixAddSubView: Em.View.extend({
		templateName: 'matrix-addition-subtraction',
		didInsertElement: function() {
			App.slider = $('#slider-container').bxSlider({
			    controls: false,
				speed:0,
				pager: false,
				slideSelector: "div.white-background",
				infiniteLoop: false,
				touchEnabled: false,
				ticker: false,
				startSlide: 0
			});
			$("div#slider-container div.white-background:first-of-type").remove();
			App.slider.goToFirstSlide();
			App.slider.setSpeed(250);
		}
	}),
	MatrixAddSubController: Em.Controller.extend({
		title: 'Matrix Calculator: Addition & Subtraction',
		rows: 3,
		cols: 3,
		resultFormating: 'decimal',
		isDecimal: function() {
			return this.get("resultFormating") == "decimal"? true:false;
		}.property('resultFormating'),
		decimalPlaces: Em.Object.create({
			selected: 2,
			content: [1,2,3,4,5,6,7,8,9,10]
		}),
		addSubtractOperation: 'subtract',
		isAdd: function() {
			return this.get("addSubtractOperation") == "add"? true:false;
		}.property('addSubtractOperation'),
		testNumber: function(string) {
			//Test does not include complex numbers
			var regex = /((0|([1-9]0|[1-9]*).0|[1-9]*|.0|[1-9]+)[eE][+-]?0|[1-9]+?)|(0|([1-9]0|[1-9]*)[eE][+-]?0|[1-9]+)/;
			return regex.test(string);
		},
		getMatrixAData: function(){
			var arrayReady = true;
			var rows = this.get("rows");
			var cols = this.get("cols");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-a-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getMatrixBData: function(){
			var arrayReady = true;
			var rows = this.get("rows");
			var cols = this.get("cols");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-b-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getData: function() {
			var matrixAddSubData = {
				matrixA: this.getMatrixAData(),
				matrixB: this.getMatrixBData(),
				isAdd: this.get("isAdd"),
				isDecimal: this.get("isDecimal"),
				decimalPlaces: this.get("decimalPlaces").get("selected"),
			}
			return matrixAddSubData;
		},
		solution: null
	}),
	MatrixSolveView: Em.View.extend({
		templateName: 'matrix-solve',
		didInsertElement: function() {
			App.slider = $('#slider-container').bxSlider({
			    controls: false,
				speed:0,
				pager: false,
				slideSelector: "div.white-background",
				infiniteLoop: false,
				touchEnabled: false,
				ticker: false,
				startSlide: 0
			});
			$("div#slider-container div.white-background:first-of-type").remove();
			App.slider.goToFirstSlide();
			App.slider.setSpeed(250);
		}
	}),
	MatrixSolveController: Em.Controller.extend({
		title: 'Matrix Calculator: System',
		rows: 3,
		cols: 3,
		resultFormating: 'decimal',
		isDecimal: function() {
			return this.get("resultFormating") == "decimal"? true:false;
		}.property('resultFormating'),
		decimalPlaces: Em.Object.create({
			selected: 2,
			content: [1,2,3,4,5,6,7,8,9,10]
		}),
		testNumber: function(string) {
			//Test does not include complex numbers
			var regex = /((0|([1-9]0|[1-9]*).0|[1-9]*|.0|[1-9]+)[eE][+-]?0|[1-9]+?)|(0|([1-9]0|[1-9]*)[eE][+-]?0|[1-9]+)/;
			return regex.test(string);
		},
		getMatrixAData: function(){
			var arrayReady = true;
			var rows = this.get("rows");
			var cols = this.get("cols");
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-a-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getMatrixBData: function(){
			var arrayReady = true;
			var rows = this.get("rows");
			var cols = 1;
			var tempArray = new Array(rows);
			for(var i = 0; i < rows; ++i)
				tempArray[i] = new Array(cols);		
			var i = 0;
			var j = 0;
			var testRealNum = this.testNumber;
			$("input.matrix-b-input").each(function(index) {
				if(!testRealNum($(this).val())){
					$(this).tipsy("timedShow");
					arrayReady = false;
					return false;
				}
				tempArray[i][j] = parseFloat($(this).val());
				++j;
				if((index + 1) % cols == 0){
					++i;
					j = 0;
				}
			});
			if(arrayReady)
				return tempArray;
			else
				return arrayReady;
		},
		getData: function() {
			var MatrixSolveData = {
				matrixA: this.getMatrixAData(),
				matrixB: this.getMatrixBData(),
				isDecimal: this.get("isDecimal"),
				decimalPlaces: this.get("decimalPlaces").get("selected"),
			}
			return MatrixSolveData;
		},
		solution: null
	}),
	Router: Em.Router.extend({
		enableLogging: true,
		root: Em.Route.extend({
			goToSolve: Em.Route.transitionTo('matrixSolveRoute.index'),
			goToAddSub: Em.Route.transitionTo('matrixAddSubRoute.index'),
			goToMul: Em.Route.transitionTo('matrixMulRoute.index'),
			goToOperations: Em.Route.transitionTo('matrixOperationsRoute.index'),
			goBack: function(router) {
				$("div#spinner-div").hide();
				App.slider.goToPreviousSlide();
			},
			index: Em.Route.extend({
				route: '/',
				redirectsTo: 'matrixOperationsRoute.index'
			}),
			matrixOperationsRoute: Em.Route.extend({
				route: '/matrix-operations',
				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router,context) {
						router.get('applicationController').connectOutlet('matrixOperations');
					},
				}),
				goBack: function(router) {
					router.get("matrixOperationsController").set("showSol",false);
					Ember.run.next(this, function() {
						$("div#spinner-div").hide();
						App.slider.goToPreviousSlide();
					});
				},
				showSolution: function(router) {
					var data = router.get("matrixOperationsController").getData();
					if(data.matrix != false){
						$('div#spinner-div').show();
						//Sending Data to Server
						$.ajax({
							url: "/matrix-operations-solution",
					    	type: "POST",
						  	data: JSON.stringify(data),
				            dataType: "json",
							contentType: "application/json; charset=utf-8",
						    success: function(response, textStatus, jqXHR){
								var solution = router.get("matrixOperationsController.solution");
								solution.set("transpose",response.transpose);
								solution.set("trace",response.trace);
								solution.set("rank",response.rank);
								solution.set("lul",response.lul);
								solution.set("luu",response.luu);
								solution.set("lup",response.lup);
								solution.set("inverse",response.inverse);
								solution.set("eigenValues",response.eigenValues);
								solution.set("eigenVectors",response.eigenVectors);
								solution.set("determinant",response.determinant);
								solution.set("reduce",response.reduce);
					        },
					        error: function(jqXHR, textStatus, errorThrown){
					            console.log("The following error occured: \ntextStatus: "+textStatus+"\nerrorThrown: "+errorThrown);
					        },
					        complete: function(){
								router.get("matrixOperationsController").set("showSol",true);
								Ember.run.next(this, function() {
								      MathJax.Hub.Typeset('MathDiv', function() {
										$("div#spinner-div").hide();
										App.slider.goToNextSlide();
									});
								 });
					        }
						});
					}
				}
			}),
			matrixMulRoute: Em.Route.extend({
				route: '/matrix-multiplication',
				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router,context) {
						router.get('applicationController').connectOutlet('matrixMul');
					},
				}),
				showSolution: function(router) {
					var data = router.get("matrixMulController").getData();
					if(data.matrixA != false && data.matrixB != false){
						//Sending Data to Server
						$.ajax({
							url: "/matrix-mul-solution",
					    	type: "POST",
						  	data: JSON.stringify(data),
				            dataType: "json",
							contentType: "application/json; charset=utf-8",
						    success: function(response, textStatus, jqXHR){
								router.get("matrixMulController").set("solution",response.solution);
					        },
					        error: function(jqXHR, textStatus, errorThrown){
					            console.log("The following error occured: \ntextStatus: "+textStatus+"\nerrorThrown: "+errorThrown);
					        },
					        complete: function(){
								Ember.run.next(this, function() {
								      MathJax.Hub.Typeset('MathDiv', function() {
										$("div#spinner-div").hide();
										App.slider.goToNextSlide();
									});
								 });
					        }
						});
					}
				}
			}),
			matrixAddSubRoute: Em.Route.extend({
				route: '/matrix-addition-subtraction',
				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router,context) {
						router.get('applicationController').connectOutlet('matrixAddSub');
					},
				}),
				showSolution: function(router) {					
					var data = router.get("matrixAddSubController").getData();
					if(data.matrixA != false && data.matrixB != false){
						//Sending Data to Server
						$.ajax({
							url: "/matrix-add-sub-solution",
					    	type: "POST",
						  	data: JSON.stringify(data),
				            dataType: "json",
							contentType: "application/json; charset=utf-8",
						    success: function(response, textStatus, jqXHR){
					        	router.get("matrixAddSubController").set("solution",response.solution);
					        },
					        error: function(jqXHR, textStatus, errorThrown){
					            console.log("The following error occured: \ntextStatus: "+textStatus+"\nerrorThrown: "+errorThrown);
					        },
					        complete: function(){
								Ember.run.next(this, function() {
								      MathJax.Hub.Typeset('MathDiv', function() {
										$("div#spinner-div").hide();
										App.slider.goToNextSlide();
									});
								 });
					        }
						});
					}
				}
			}),
			matrixSolveRoute: Em.Route.extend({
				route: '/matrix-solve',
				index: Em.Route.extend({
					route: '/',
					connectOutlets: function(router,context) {
						router.get('applicationController').connectOutlet('matrixSolve');
					},
					showSolution: function(router) {						
						var data = router.get("matrixSolveController").getData();
						if(data.matrixA != false && data.matrixB != false){
							//Sending Data to Server
							$.ajax({
								url: "/matrix-solve-solution",
						    	type: "POST",
							  	data: JSON.stringify(data),
					            dataType: "json",
								contentType: "application/json; charset=utf-8",
							    success: function(response, textStatus, jqXHR){
						        	router.get("matrixSolveController").set("solution",response.solution);
						        },
						        error: function(jqXHR, textStatus, errorThrown){
						            console.log("The following error occured: \ntextStatus: "+textStatus+"\nerrorThrown: "+errorThrown);
						        },
						        complete: function(){
									Ember.run.next(this, function() {
									      MathJax.Hub.Typeset('MathDiv', function() {
											$("div#spinner-div").hide();
											App.slider.goToNextSlide();
										});
									 });
						        }
							});
						}
					}
				})
			})
		})
	})
});

//VIEWS
App.MatrixView = Em.View.extend({
	rows: 1,
	cols: 1,
	isCenter: true,
	inputFieldClass: 'matrix-input',
	tableClass: 'defaultTableClass',
	htmlString: function() {
		var rows = this.get("rows");
		var cols = this.get("cols");
		var localBuffer = this.get("isCenter")? "<table class=\"center "+ this.get("tableClass") +"\"><tbody>":"<table><tbody>";
		for (var i = 0;i < rows; ++i){
			localBuffer += "<tr>";
			for (var j = 0;j < cols; ++j){
				localBuffer += "<td>{{view App.NumberTextField class=\"matrix-input "+ this.get("inputFieldClass") +"\"}}</td>";
			}
			localBuffer += "</tr>"
		}
		localBuffer += "</tbody></table>";
		return localBuffer;
	}.property('rows','cols'),
	rowsChanged: function() {
		this.set("template",Em.Handlebars.compile(this.get("htmlString")));
		this.rerender();
	}.observes('rows'),
	colsChanged: function() {
		this.set("template",Em.Handlebars.compile(this.get("htmlString")));
		this.rerender();
	}.observes('cols'),
	init: function() {
		this._super();
		this.set("template",Em.Handlebars.compile(this.get("htmlString")));
		this.rerender();
	}
});
App.RealNumberTextField = Em.TextField.extend({
	keyUp: function(event) {
		if(event.keyCode == 13){
			if(this.testRealNumber(this.get("value"))) {
				this.get("loc").set(this.get("varName"),this.get("value"));
				this.$().tipsy("hide");
			}
			else {
				this.$().tipsy("timedShow");
			}
		}
	},
	focusOut: function(event) {
		if(this.testRealNumber(this.get("value"))) {
			this.get("loc").set(this.get("varName"),this.get("value"));
			this.$().tipsy("hide");
		}
		else {
			this.$().tipsy("timedShow");
		}
	},
	didInsertElement: function() {
		this.$().tipsy({
			trigger: 'manual',
			fade: true,
			gravity: 's'
		});
		this.$().attr('original-title','This value must be a positive integer between 2-7.');
	},
	willDestroyElement: function() {
		this.$().tipsy("hide");
	},
	testRealNumber: function(string) {
		var intRegex = /^[2-7]{1}$/;
		return intRegex.test($.trim(string));
	}
});
App.NumberTextField = Em.TextField.extend({
	keyUp: function(event) {
		if(event.keyCode == 13){
			if(!this.testNumber(this.get("value"))) {
				this.$().tipsy("timedShow");
			} else {
				this.$().tipsy("hide");
			}
		}
	},
	focusOut: function(event) {
		if(!this.testNumber(this.get("value"))) {
			this.$().tipsy("timedShow");
		} else {
			this.$().tipsy("hide");
		}
	},
	didInsertElement: function() {
		this.$().tipsy({
			trigger: 'manual',
			fade: true,
			gravity: 's'
		});
		this.$().attr('original-title','This value must be a number.');
	},
	willDestroyElement: function() {
		this.$().tipsy("hide");
	},
	testNumber: function(string) {
		//Test does not include complex numbers
		var regex = /((0|([1-9]0|[1-9]*).0|[1-9]*|.0|[1-9]+)[eE][+-]?0|[1-9]+?)|(0|([1-9]0|[1-9]*)[eE][+-]?0|[1-9]+)/;
		return regex.test(string);
	}
});
App.RadioButton = Em.View.extend({
	value: "",
	group: "",
	isDisabled: false,
	template: Em.Handlebars.compile("<input type='radio' name='default'>"),
	init: function() {
		this._super();
		this.set("template",Em.Handlebars.compile("<input type='radio' name='"+ this.get("group") +"'/checked>"));
		this.rerender();
	},
	click: function() {
		this.set("value",this.get("option"));
	}
});
App.initialize();
