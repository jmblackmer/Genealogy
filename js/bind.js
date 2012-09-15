Genealogy.Bind = {};

Genealogy.Bind.BindModelToPage = function()
{
  Genealogy.Bind.BoundElements = [];
  Genealogy.Bind.BindModel(Genealogy.Model);
}

Genealogy.Bind.BindModel = function(data, path)
{
  path = typeof path === 'string' ? path : "";

  if (typeof(data) === 'object')
  {
    for (var key in data)
    {
      Genealogy.Bind.BindModel(data[key], path + (path === "" ? "" : ".") + key);
    }
  }
  else
  {
    $.each($('[name="' + path + '"]'), function()
      {
        var element = $(this);
        
        Genealogy.Bind.SetElementValue(element, data);
        Genealogy.Bind.BindEventsToForm(element);
        
        Genealogy.Bind.BoundElements[path] = Genealogy.Bind.BoundElements[path] || [];
        Genealogy.Bind.BoundElements[path].push(element);
      });
  }
}

Genealogy.Bind.ValueChange = function(object)
{
  Genealogy.Bind.SaveFormValuesToModel(object.val(), object.attr('name'));
  Genealogy.Bind.UpdateBoundElements(object.val(), object.attr('name'), object);
}

Genealogy.Bind.SaveFormValuesToModel = function(value, path)
{
  var i = path.indexOf(".");
  
  if (i < 0 && path.toLowerCase() != 'id')
  {
    Genealogy.Model[path] = value;
  }
  else
  {
    var index = path.substr(0,i);
    var newPath = path.substr(i+1);
    Genealogy.Bind.SaveFormValuesToModel(value, newPath);
  }
}

Genealogy.Bind.SetElementValue = function(element, value)
{
  if (element.is("input"))
  {
    element.val(value);
  }
  else if (element.is("span"))
  {
    element.text(value);
  }
  else if (element.is("a"))
  {
    if ((match = /([a-z]+)[.]([0-9]+[.])?Id$/i.exec($(element).attr('name'))) != null)
    {
      $(element).attr('href', "#" + match[1] + "?id=" + value);
    }
  }
}

Genealogy.Bind.BindEventsToForm = function(element)
{
  if (element.is("input"))
  {
    element.keyup(function() { Genealogy.ValueChange(element); });
  }
}

Genealogy.Bind.UpdateBoundElements = function(value, path, ignore)
{
  if (Genealogy.Bind.BoundElements[path])
  {
    for(var i in Genealogy.Bind.BoundElements[path])
    {
      if (Genealogy.Bind.BoundElements[path][i] != ignore)
      {
        Genealogy.Bind.SetElementValue(Genealogy.Bind.BoundElements[path][i], value);
      }
    }
  }
}