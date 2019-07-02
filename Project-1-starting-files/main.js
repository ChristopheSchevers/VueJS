new Vue({
    el: '#app',
    data: {
        yourHp: 100,
        monsterHp: 100,
        monsterTurn: false,
        inGame: false,
        disableBtns: true,
        log: []
    },
    watch: {
        yourHp: function(){
            if(this.yourHp <= 0){
                this.yourHp = 0;
                this.log.unshift('You lost, ya pansy!');
                setTimeout(function(){
                    this.inGame = !this.inGame;
                }.bind(this), 3000);
            } 
        },
        monsterHp: function(){
            if(this.monsterHp <= 0){
                this.disableBtns = true;
                this.monsterHp = 0;
                this.log.unshift('You won, ya magnificent bastard!');
                setTimeout(function(){
                    this.inGame = !this.inGame;
                }.bind(this), 3000);
            }
        },
        monsterTurn: function(){
            if(this.monsterTurn){
                setTimeout(this.attack(this.yourHp), 2000);
                this.monsterTurn = false;
                this.disableBtns = false;
            }
        }
    },
    methods: {
        startGame: function(){
            this.log = [];
            this.yourHp = 100;
            this.monsterHp = 100;
            this.inGame = true;
            this.monsterTurn = false;
            this.disableBtns = false;
        },
        attack: function(target){
            let amount = Math.floor(Math.random() * 20);

            if(target == this.monsterHp){
                this.disableBtns = true;
                this.monsterHp -= amount;
                this.log.unshift(`Player used attack and dealt ${amount} of damage.`);
                this.monsterTurn = true;
            } else if(target == this.yourHp){
                this.yourHp -= amount;
                this.log.unshift(`Monster used attack and dealt ${amount} of damage.`);
                this.monsterTurn = false;
            }
        },
        specialAttack: function(){
            let amount = Math.floor(Math.random() * 40)+ 20;

            this.disableBtns = true;
            this.monsterHp -= amount;
            this.log.unshift(`Player used special attack and dealt ${amount} of damage.`);
            this.monsterTurn = true;
        },
        heal: function(){
            if(this.yourHp == 100){
                this.log.unshift(`You are already at full health.`);
            } else if(this.yourHp + 40 > 100){
                this.disableBtns = true;
                this.yourHp = 100;
                this.log.unshift(`Player used heal.`);
                this.monsterTurn = true;
            } else {
                this.disableBtns = true;
                this.yourHp += 40;
                this.log.unshift(`Player used heal.`);
                this.monsterTurn = true;
            }

        },
        forfeit: function(){
            this.inGame = false;
            alert('You lost, ya cunt!');
        }
    }
});