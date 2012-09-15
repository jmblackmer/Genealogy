<html>
<head>
  <link href="styles/Genealogy.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="js/jquery-1.8.1.js"></script>
  <script type="text/javascript" src="js/inflection.js"></script>
  <script type="text/javascript">Genealogy = {}</script>
  <script type="text/javascript" src="js/base.js"></script>
  <script type="text/javascript" src="js/bind.js"></script>
  <script type="text/javascript" src="js/view.js"></script>
  <script type="text/javascript">
    var model =
    {
      Individuals:
      [
        {
          Id: 1,
          Name: { Id: 12, Value: "Joseph Blackmer" },
          ListedAs: { Id: 12, Value: "Joseph Blackmer" }
        },
        {
          Id: 2,
          Name: { Id: 12, Value: "Michael Blackmer" },
          ListedAs: { Id: 12, Value: "Michael Blackmer" }
        }
      ]
    };
    
    function HandleMethod()
    {
      Genealogy.Model = model;
      
      Genealogy.View.LoadTemplate(
        Genealogy.GetMethod() || "Main",
        Genealogy.Bind.BindModelToPage
      );
    }
  
    $(document).ready(HandleMethod);
    $(window).bind('hashchange', HandleMethod);
  </script>
</head>
<body>
  <div class="Icon"><img src="images/tree.gif"/></div>
  <div class="Panel"></div>
  <div class="Search">
    <form>
      <input id="q" name="q" placeholder="Search" type="text" />
    </form>
  </div>
  <div class="Border">
    <div class="Content"></div>
  </div>
  <div class="Header">
  </div>
</body>
</html>
