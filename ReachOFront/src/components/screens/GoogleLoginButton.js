GoogleUtil.setup()
 .then(() => {
     GoogleUtil.login(
       (err,data) => {
         this.handleLogin(err,data)
      }
     );
 });
