new Vue({
    el: '#app',
    data: {
        yourHp: 100,
        monsterHp: 100,
        monsterTurn: false,
        monsterResponseTime: 1000,
        inGame: false,
        gameOver: false,
        disableBtns: true,
        specialCldwn: false,
        log: []
    },
    watch: {
        monsterTurn: function(){
            if(this.monsterTurn){
                this.attack(this.yourHp);
                
                if(this.yourHp <= 0){
                    this.gameOver = true;
                    this.yourHp = 0;
                    this.log.unshift('You lost, ya pansy!');
                    setTimeout(function(){
                        this.inGame = !this.inGame;
                    }.bind(this), 3000);
                } else {
                    this.monsterTurn = false;
                    this.disableBtns = false;
                }
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
            this.gameOver = false;
        },
        attack: function(target){
            let amount = Math.floor(Math.random() * 20);

            if(target == this.monsterHp){
                this.disableBtns = true;
                this.monsterHp -= amount;
                this.log.unshift(`Player used attack and dealt ${amount} of damage.`);

                if(this.monsterHp <= 0){
                    this.gameOver = true;
                    this.disableBtns = true;
                    this.monsterHp = 0;
                    this.log.unshift('You won, ya magnificent bastard!');
                    setTimeout(function(){
                        this.inGame = !this.inGame;
                    }.bind(this), 3000);
                } else {
                    setTimeout(function(){
                        this.monsterTurn = true;
                    }.bind(this), this.monsterResponseTime);
                }

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
            this.specialCldwn = true;

            if(this.monsterHp <= 0){
                this.gameOver = true;
                this.disableBtns = true;
                this.monsterHp = 0;
                this.log.unshift('You won, ya magnificent bastard!');
                setTimeout(function(){
                    this.inGame = !this.inGame;
                }.bind(this), 3000);
            } else {
                setTimeout(function(){
                    this.monsterTurn = true;
                }.bind(this), 1000);
            }

        },
        heal: function(){
            if(this.yourHp == 100){
                this.log.unshift(`You are already at full health.`);
            } else if(this.yourHp + 40 > 100){
                this.disableBtns = true;
                this.yourHp = 100;
                this.log.unshift(`Player used heal.`);

                setTimeout(function(){
                        this.monsterTurn = true;
                    }.bind(this), this.monsterResponseTime);
            } else {
                this.disableBtns = true;
                this.yourHp += 40;
                this.log.unshift(`Player used heal.`);

                setTimeout(function(){
                    this.monsterTurn = true;
                }.bind(this), this.monsterResponseTime);
            }

        },
        forfeit: function(){
            this.inGame = false;
            alert(`You lost, ya quittin' cunt!`);
        }
    }
});