Genealogy.View = {};
Genealogy.View.Templates = [];

Genealogy.View.LoadTemplate = function(method, postCallback)
{
  if (Genealogy.View.Templates[method])
  {
    Genealogy.View.BuildTemplate(Genealogy.View.Templates[method]);
  }
  else
  {
    $.ajax(
    {
      type: "GET",
      url: "views/" + method + ".tmpl.xml",
      dataType: "xml",
      success: function(xml)
        {
          Genealogy.View.Templates[method] = xml;
          Genealogy.View.BuildTemplate(xml);
          if (postCallback) postCallback();
        }
    })
    .error(function(a,b,c){Genealogy.View.Templates[method] = null;alert(c)});
  }
}

Genealogy.View.BuildTemplate = function(xml)
{
  $.each($(xml).contents(), function()
    {
      Genealogy.View.BuildElement($(this), Genealogy.Model, "", $(".Content")[0]);
    });
}

Genealogy.View.BuildElement = function(parentXml, object, path, parentHtml)
{
  $.each($(parentXml).contents(), function (x, childXml)
  {
    var property = object[childXml.nodeName];
    if (property)
    {
      var propertyPath = Genealogy.View.AppendPath(path, childXml.nodeName);
      if ($.isArray(property))
      {
        $.each(property, function (p, arrayItem)
        {
          var itemPath = Genealogy.View.AppendPath(propertyPath, p);
          Genealogy.View.BuildElement(childXml, arrayItem, itemPath, parentHtml);
        });
      }
      else
      {
        Genealogy.View.BuildElement(childXml, property, propertyPath, parentHtml);
      }
    }
    else
    {
      var childHtml = Genealogy.View.CloneNode(childXml, path);
      $(parentHtml).append(childHtml);
      
      if (childXml.nodeName != "#text")
      {
        Genealogy.View.BuildElement(childXml, object, path, childHtml);
      }
    }
  });
}

Genealogy.View.ReplacePathValues = function(value, path)
{
  var regex = /\{\{(([a-z]+)[.])?([a-z]+)\}\}/i;
  var newValue = value;
  
  var count = 0;
  while ((match = regex.exec(newValue)) != null && count++ < 10)
  {
    if (match[2] == null)
    {
      newValue = newValue.replace(match[0], path + '.' + match[3]);
    }
    else
    {
      var pathMatch = new RegExp("^([a-z0-9.]*" + match[2] + "([.][0-9]+)?)([.]|$)", "i").exec(path);
      
      if (pathMatch == null)
      {
        newValue = newValue.replace(match[0], "");
      }
      else
      {
        newValue = newValue.replace(match[0], pathMatch[1] + '.' + match[3]);
      }
    }
  }
  
  return newValue;
}

Genealogy.View.AppendPath = function(path, value)
{
  return path + (path == '' ? '' : '.') + value;
}

Genealogy.View.CloneNode = function(node, path)
{
  var tag = node.nodeName;
  var newNode;
  
  if (tag === '#text')
  {
    newNode = node.cloneNode(false);
  }
  else
  {
    newNode = $("<" + tag + "></" + tag + ">");
    
    if (node.attributes)
    {
      $.each(node.attributes, function (i, attribute)
      {
        newNode.attr(attribute.name, Genealogy.View.ReplacePathValues(attribute.value, path));
      });
    }
  }
  
  return newNode;
}