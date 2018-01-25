// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };


    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem

        }
    };

})();


//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
      getinput: function() {
          return {
              type: document.querySelector(DOMstrings.inputType).value, // Will be "inc" or "exp
              description: document.querySelector(DOMstrings.inputDesc).value,
              value: document.querySelector(DOMstrings.inputValue).value
          };
      },

       getDOMstrings: function () {
           return DOMstrings;
       }
    };
})();


// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListerners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };



    var ctrlAddItem = function() {
        var input, newItem

        // TODO 1.Get the filed input data
        input = UICtrl.getinput();

        // TODO 2.Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // TODO 3.Add the item to the UI

        // TODO 4.Calculate the budget

        // TODO 5.Display the budget on UI


    }

    return {
        init: function() {
            setupEventListerners();
        }
    };


})(budgetController, UIController);

controller.init();