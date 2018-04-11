var canvasCode = {
    codeNums : '',
    codeLength : 6,
    codeChars : [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    createCode:function (canvas) {

        this.codeNums = '';
        var cans = canvas.getContext('2d'),
            width = canvas.width,
            height = canvas.height;
        cans.clearRect(0,0,width,height);
        cans.fillStyle = "#f2f2f2";
        cans.fillRect(0,0,width,height);
        cans.fillStyle = "#3297fd";
        cans.font = "italic bolder 50px 'Arial'";
        var filp = 1 //初始化反转值，用于canvas角度翻转
        for(var i=0;i<this.codeLength;i++) {
            var charNum = Math.round(Math.random() * (this.codeChars.length-1));
            filp = i%2 ? -1 : 1;
            cans.save();
            cans.rotate(Math.round(3*Math.random()) * filp * Math.PI/180);
            cans.fillText(this.codeChars[charNum],(width *(0.1+0.14*i)),height*0.55+Math.round(height*0.15*Math.random()));
            cans.restore();
            this.codeNums += this.codeChars[charNum];
        }


    }
}
export default canvasCode;
