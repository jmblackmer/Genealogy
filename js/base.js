genealogy = {};
    
function GetHash()
{
  var hash = window.location.hash;
  
  if (typeof hash === "string" && hash.length > 1)
  {
    hash = hash.substring(1).toLowerCase();
  }
  else
  {
    hash = null;
  }
  
  return hash;
}

function HandleHash()
{
  var hash = GetHash();
  
  if (typeof genealogy[hash] === 'undefined')
  {
    $.getScript("js/views/" + hash + ".js",
      function()
      {
        ExecHash(hash)
      })
      .fail(
        function () 
        {
          ExecHash("error")
        });
  }
  else
  {
    ExecHash(hash);
  }
}

function ExecHash(hash)
{
  var view = genealogy[hash];
  
  if (typeof view === 'function')
  {
    view();
  }
}