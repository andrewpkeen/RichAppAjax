describe('getMenuItem', function () {

  // Example of a valid response
  var responseObject = {
    menu_items:[
      {id:1,short_name:"A1",name:"Won Ton Soup with Chicken",description:"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",price_small:2.55,price_large:5.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:2,short_name:"A2",name:"Egg Drop Soup",description:"chicken broth with egg drop",price_small:2.25,price_large:4.5,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:3,short_name:"A3",name:"Chicken Corn Soup",description:"clear chicken broth with creamy corn and egg drop with white meat chicken pieces",price_small:2.75,price_large:5.5,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:4,short_name:"A4",name:"Hot and Sour Soup",description:"tofu, chicken, mushroom, bamboo shoot, and egg",price_small:2.55,price_large:5.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:5,short_name:"A5",name:"Egg Drop with Won Ton Soup",description:"chicken soup with egg drop and won tons",price_small:3.0,price_large:6.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:6,short_name:"A6",name:"Chicken Noodle (or Rice) Soup",description:"clear broth and lo mein noodles or white rice, chicken pieces",price_small:2.55,price_large:5.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:7,short_name:"A7",name:"Garden Vegetable Soup",description:"clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas)",price_small:2.55,price_large:5.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:8,short_name:"A8",name:"Garden Vegetable Soup with Tofu",description:"clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) with tofu pieces",price_small:3.0,price_large:6.0,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:9,short_name:"A9",name:"Chicken with Garden Vegetable Soup",description:"clear chicken broth with mixed vegetables (carrots, cabbage, baby corn, mushroom, snow peas) and chicken pieces",price_small:3.25,price_large:6.4,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:10,short_name:"A10",name:"Hong Kong Style Won Ton Soup",description:"clear chicken broth with carrots, mushrooms, snow peas, and broccoli, and a few pieces of Hong Kong style won tons",price_small:4.25,price_large:8.5,small_portion_name:"pint",large_portion_name:"quart",image_present:true},
      {id:11,short_name:"A11",name:"Young Chow Won Ton Soup (for 2)",description:"clear chicken broth with vegetables, veal, chicken, and beef and won tons",price_small:null,price_large:11.95,small_portion_name:null,large_portion_name:null,image_present:true}
    ],
    category:{
      short_name:"A",
      name:"Soup",
      special_instructions:""
    }
  };

  var menuService;
  var $httpBackend;
  var ApiPath;
  var $rootScope;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
      $rootScope = $injector.get('$rootScope');
    });
  });

  it('should return the correct item', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items.json?category=A').respond(responseObject);
    menuService.getMenuItem('A6').then(function(response) {
      expect(response.id).toEqual(6);
      expect(response.short_name).toEqual('A6');
      expect(response.name).toEqual("Chicken Noodle (or Rice) Soup");
      expect(response.price_small).toEqual(2.55);
    }).catch(function (reason) {
      fail('Menu item was rejected: ' + reason);
    })
    $httpBackend.flush();
  });

  it('should fail for a non-existent item', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items.json?category=A').respond(responseObject);
    menuService.getMenuItem('A75').then(function(response) {
      fail('Found a non-existent item: ' + response);
    }).catch(function (reason) {
      expect(reason).toEqual('A75');
    })
    $httpBackend.flush();
  });

  it('should fail for a server error', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items.json?category=A').respond(404, 'Not Found');
    menuService.getMenuItem('A6').then(function(response) {
      fail("Didn't get a 404 error: " + response);
    }).catch(function (reason) {
      expect(reason.data).toEqual('Not Found');
      expect(reason.status).toEqual(404);
    })
    $httpBackend.flush();
  });
  
  it('should fail for an invalid short name', function() {
    menuService.getMenuItem(':)').then(function(response) {
      fail('Somehow found a smiley face in the menu: ' + response);
    }).catch(function (reason) {
      expect(reason).toEqual(':)');
    });
    $httpBackend.verifyNoOutstandingRequest();
    $rootScope.$apply();
  });

});
