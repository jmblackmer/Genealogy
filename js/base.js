Genealogy.GetMethod = function()
{
  var hash = window.location.hash;
  var method = null;
  
  if (typeof hash === "string" && hash.length > 1)
  {
    var match = /^#([a-z]+)([?]|$)/i.exec(hash);
    if (match != null) method = match[1].toLowerCase();
  }
  
  return method;
}

Genealogy.GetParameter = function(param)
{
  var hash = window.location.hash;
  var method = null;
  
  if (typeof hash === "string" && hash.length > 1)
  {
    var match = new RegExp("^#.*[?&]" + param + "=([a-z0-9])+(&|$)", "i").exec(hash);
    if (match != null) method = match[1].toLowerCase();
  }
  
  return method;
}

Genealogy.HandleMethod = function(postCallback)
{
  var method = Genealogy.GetMethod();
  if (postCallback) postCallback(Genealogy.GetMethod());
  // if (typeof genealogy[method] === 'undefined')
  // {
    // $.getScript("js/views/" + method + ".js",
      // function()
      // {
        // ExecMethod(method)
      // })
      // .fail(
        // function () 
        // {
          // ExecMethod("error")
        // });
  // }
  // else
  // {
    // ExecMethod(method);
  // }
}

function ExecMethod(method)
{
  var view = genealogy[method];
  
  if (typeof view === 'function')
  {
    view();
  }
}