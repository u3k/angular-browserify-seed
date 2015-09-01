module.exports = function() {
  function ScrollDataSource(data) {
    this.scrollIncrement = 10;
    this.scrollStartNum = this.scrollItemsNum = 20;

    this.items = data;
    this.viewItems = this.items.slice(0, this.scrollStartNum);

    this.getMoreItems = function(){
      this.scrollItemsNum += this.scrollIncrement;
      this.viewItems = this.items.slice(0, this.scrollItemsNum);
    };
  }

  return ScrollDataSource;
};
