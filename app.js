var cubicApp = angular.module('cubicApp',[]);

cubicApp.controller('CubicCtrl',['$scope', '$http', '$filter', function($scope,$http,$filter){
	var vm = $scope;
	var TAM = 100;
	vm.filas = new Array(TAM);

	
	function generaCols(){
		vm.columnas = new Array(TAM);
		for(var i = 0; i<vm.columnas.length; i++){
			vm.columnas[i] = {
				"col": i,
				"estado": '1'
			}
		}
	}

	vm.pintaArea = function(){
		var filMin = vm.supizq.fil-1;
		var filMax = vm.infder.fil;
		var colMin = vm.supizq.col-1;
		var colMax = vm.infder.col;
		for(var i = filMin; i<filMax; i++){
			for(var j = colMin; j<colMax; j++){
				if(vm.colRelle == 'V' || vm.colRelle == 'v'){
					vm.filas[i].col[j].estado = '2';
				} else if(vm.colRelle == 'M' || vm.colRelle == 'm'){
					vm.filas[i].col[j].estado = '3';
				} else if(vm.colRelle == 'R' || vm.colRelle == 'r'){
					vm.filas[i].col[j].estado = '1';
				} else if(vm.colRelle == 'A' || vm.colRelle == 'a'){
					vm.filas[i].col[j].estado = '4';
				}
			}
		}
	}

	vm.cargaMapa = function(){
		vm.mapaCub = localStorage.getItem("mapaCubic");
		vm.mapaCub = JSON.parse(vm.mapaCub);
		if(vm.mapaCub != null){
			vm.filas = vm.mapaCub;
		} else {
			generaCols();
			for(var i = 0; i<vm.filas.length; i++){
				vm.filas[i] = {"col": vm.columnas};
				generaCols();
			}
		}
	}
	
	vm.reiniciaMapa = function(){
		localStorage.removeItem("mapaCubic");
	}

	vm.guardaMapa = function(){
		var jsonDatos = $filter('json')(vm.filas, 2);
		localStorage.setItem("mapaCubic", jsonDatos);
	}

	vm.cargaMapa();

	vm.pulsa = function(fila, col, estado){
		var posF = fila;
		var posC = col;
		if(estado == '1'){
			vm.filas[posF].col[posC].estado = '2';
		} else if(estado == '2'){
			vm.filas[posF].col[posC].estado = '3';
		} else if(estado == '3'){
			vm.filas[posF].col[posC].estado = '4';
		} else if(estado == '4'){
			vm.filas[posF].col[posC].estado = '1';
		}
	}
}])