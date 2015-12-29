'use strict';

/**
 * @ngdoc function
 * @name bstApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the bstApp
 */
angular.module( 'weddingApp' )
    .controller( 'GiftCtrl', function ( $scope, _, $http, API_URL, toaster, lodash ) {
        var self = this;
        $scope.formData = {};
        $scope.typeOptions = [{name: 'Bargeld', value: 'Bargeld'}, {name: 'Überweisung', value: 'Ueberweisung'}]
        $scope.form = {type : $scope.typeOptions[0].value};
        $http.get(API_URL + 'gift').then(function(response) {

            var result = _.chain(response.data)
                .groupBy("category")
                .pairs()
                .map(function(currentItem) {
                    return _.object(_.zip(["description", "title", "totalAmount", "picture", "schenkungsart", "anzahl", "geschenktVon", "bereitsGeschenkt" ], currentItem));
                })
                .value();
            console.log(result);

            $scope.giftItems = result;
        });

        $scope.selectedItemIndex;

        $scope.selected = function(currentGift){
            $scope.giftItems.forEach(function(item){
                if(item._id === currentGift._id){
                    $scope.giftItems[index].selected = true;
                }
                else{
                    item.selected = false;
                }

            })

            //$scope.selectedItemIndex = index;
            $scope.selectedItem = currentGift;
        }

        $scope.closeOverlay = function () {
            $scope.selectedItem = null;
        }

        $scope.donate = function (vorname, nachname, email, schenkungsart) {
            $scope.selectedItem.schenkungsart = $scope.form.type;
            $scope.selectedItem.vorname = vorname;
            $scope.selectedItem.nachname = nachname;
            $scope.selectedItem.email = email;
            $scope.selectedItem.anzahl = $scope.selectedItem.anzahl -1;
            if($scope.selectedItem.anzahl == 1){
                $scope.selectedItem.bereitsGeschenkt = true;
            }

            $http.put(API_URL + 'gift/'+ $scope.selectedItem._id, $scope.selectedItem).success( function ( resp ) {
                var itemToDelete = $scope.selectedItem;
                $scope.closeOverlay();
                    lodash.remove($scope.giftItems, function(item) {
                        return item._id === itemToDelete._id;
                    });
                //$scope.giftItems = null;
                //$scope.$pristine;
                //$http.get(API_URL + 'gift').then(function(response) {
                //    $scope.giftItems = response.data;
                //});
            })
                .error( function ( error ) {
                    alert('error')
                })
        }

        $scope.getImagePath = function(picturename){
            return "../assets/images/" + picturename;
        }

        $scope.setSchenkungsart = function ( schenkungsart ) {
            $scope.selectedItem.schenkungsart = schenkungsart;
        }
    } );
