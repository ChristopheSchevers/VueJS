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
                let damage = this.calculateDamage(5,12)

                this.yourHp -= damage;
                this.log.unshift(`Monster used attack and dealt ${damage} of damage.`);
                this.monsterTurn = false;
                this.disableBtns = false;
                
                this.checkWin(); 
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
        attack: function(){
            let damage = this.calculateDamage(3,10);

            this.disableBtns = true;
            this.monsterHp -= damage;
            this.log.unshift(`Player used attack and dealt ${damage} of damage.`);

            if(this.checkWin()){
                return;
            } else {
                setTimeout(function(){
                    this.monsterTurn = true;
                }.bind(this),this.monsterResponseTime);
            }
        },
        specialAttack: function(){
            let damage = Math.floor(Math.random() * 40)+ 20;

            this.disableBtns = true;
            this.monsterHp -= damage;
            this.log.unshift(`Player used special attack and dealt ${damage} of damage.`);
            this.specialCldwn = true;
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
        },
        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHp <= 0){
                if(confirm('You won, ya magnificent bastard! Wanna fight again?')){
                    this.startGame();
                } else {
                    this.inGame = false;
                }           
                return true     
            } else if(this.yourHp <= 0){
                if(confirm('You lost, ya pansy! Wanna try again?')){
                    this.startGame();
                } else {
                    this.inGame = false;
                }
                return false;
            }
        }
    }
});