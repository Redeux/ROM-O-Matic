$(document).ready(function () {
  $('select').formSelect();

  $('#IntelVM-add-button').on('click', addIntelVMRow);
  $('#PowerVM-add-button').on('click', addPowerVMRow);
  $('#Container-add-button').on('click', addContainerRow);
  $('#NFS-add-button').on('click', addNFSRow);
  $('#Block-add-button').on('click', addBlockRow);
  $('#Object-add-button').on('click', addObjectRow);
  $('#PostgreSQL-add-button').on('click', addPostgreSQLRow);
  $('#MSSQL-add-button').on('click', addMSSQLRow);
  $('#Couchbase-add-button').on('click', addCouchbaseRow);

  $(document).on('click', ".delete-row", deleteRow)
});

function addIntelVMRow() {
  const intelVM = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('frontend'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("operating-system")
      .append($("<select>")
        .append($("<option>")
          .val('')
          .attr("disabled", "disabled")
          .attr("selected", "selected")
          .text("Choose one")
        )
        .append($("<option>")
          .attr("value", "Linux")
          .text("Linux")
        )
        .append($("<option>")
          .attr("value", "Windows")
          .text("Windows")
        )
        .append($("<option>")
          .attr("value", "Appliance")
          .text("Appliance")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), intelVM);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addPowerVMRow() {
  const powerVM = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('backend'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("operating-system")
      .append($("<select>")
        .append($("<option>")
          .val('')
          .attr("disabled", "disabled")
          .attr("selected", "selected")
          .text("Choose one")
        )
        .append($("<option>")
          .attr("value", "AIX")
          .text("AIX")
        )
        .append($("<option>")
          .attr("value", "Linux")
          .attr("disabled", "disabled")
          .text("Linux")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), powerVM);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addContainerRow() {
  const container = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('service'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("base-image")
      .append($("<select>")
        .append($("<option>")
          .val('')
          .attr("disabled", "disabled")
          .attr("selected", "selected")
          .text("Choose one")
        )
        .append($("<option>")
          .attr("value", "WAS")
          .text("WAS Liberty")
        )
        .append($("<option>")
          .attr("value", "NGINX")
          .text("NGINX")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), container);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addNFSRow() {
  const NFS = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('server files'))
    .append(regionSelect)
    .append($("<td>")
      .addClass("base-image")
      .append($("<select>")
        .append($("<option>")
          .attr("value", "Flash")
          .attr("selected", "selected")
          .text("Flash")
        )
      )
    )
    .append(sizeInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), NFS);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addBlockRow() {
  const block = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('cluster store'))
    .append(regionSelect)
    .append($("<td>")
      .addClass("base-image")
      .append($("<select>")
        .append($("<option>")
          .attr("value", "Flash")
          .attr("selected", "selected")
          .text("Flash")
        )
      )
    )
    .append(sizeInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), block);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addObjectRow() {
  const object = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('images'))
    .append(regionSelect)
    .append($("<td>")
      .addClass("base-image")
      .append($("<select>")
        .append($("<option>")
          .attr("value", "SATA")
          .attr("selected", "selected")
          .text("SATA")
        )
        .append($("<option>")
          .attr("value", "Flash")
          .attr("disabled", "disabled")
          .text("Flash")
        )
      )
    )
    .append(sizeInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), object);

  // initialize dropdown
  $('select').formSelect();
  return true;

}

function addPostgreSQLRow() {
  const postgreSQL = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("versions")
      .append($("<select>")
        .append($("<option>")
          .val('')
          .attr("disabled", "disabled")
          .attr("selected", "selected")
          .text("Choose one")
        )
        .append($("<option>")
          .attr("value", "9.x")
          .text("9.x")
        )
        .append($("<option>")
          .attr("value", "10.x")
          .text("10.x")
        )
        .append($("<option>")
          .attr("value", "11.x")
          .text("11.x")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), postgreSQL);

  // initialize dropdown
  $('select').formSelect();
  return true;

}

function addMSSQLRow() {
  const msSQL = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("versions")
      .append($("<select>")
        .append($("<option>")
          .val('')
          .attr("disabled", "disabled")
          .attr("selected", "selected")
          .text("Choose one")
        )
        .append($("<option>")
          .attr("value", "2016")
          .text("2016")
        )
        .append($("<option>")
          .attr("value", "2017")
          .text("2017")
        )
        .append($("<option>")
          .attr("value", "2019")
          .attr("disabled", "disabled")
          .text("2019")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), msSQL);

  // initialize dropdown
  $('select').formSelect();
  return true;
}

function addCouchbaseRow() {
  const couchBase = $('<tr>').addClass('no-border')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(instancesInput)
    .append($("<td>")
      .addClass("versions")
      .append($("<select>")
        .append($("<option>")
          .attr("selected", "selected")
          .attr("value", "6.x")
          .text("6.x")
        )
      )
    )
    .append(vcpuInput)
    .append(ramInput)
    .append(localStorageInput)
    .append(replicationCheckbox)
    .append(backupCheckbox)
    .append(monthlyBillingOutput);

  addRowToBody($(this), couchBase);

  // initialize dropdown
  $('select').formSelect();
  return true;
}


function addRowToBody(elem, row) {
  return elem.closest('tr')
    .parent()
    .prev()
    .append(row)
}

function deleteRow() {
  $(this).closest('tr').remove();
  return true;
}

function removeButton() {
  return $("<td>")
    .append($("<div>")
      .addClass("valign-wrapper")
      .append($("<i>")
        .addClass("small material-icons red-text text-darken-2 delete-row")
        .text("remove_circle")
      ))
}

function descriptionInput(desc) {
  return $("<td>")
    .addClass("description")
    .append($("<input>")
      .attr("placeholder", desc)
      .attr("type", "text")
    )
}

function regionSelect() {
  return $("<td>")
    .addClass("region")
    .append($("<select>")
      .append($("<option>")
        .val('')
        .attr("disabled", "disabled")
        .attr("selected", "selected")
        .text("Choose one")
      )
      .append($("<option>")
        .attr("value", "Dev")
        .text("Dev")
      )
      .append($("<option>")
        .attr("value", "PStage")
        .text("PStage")
      )
      .append($("<option>")
        .attr("value", "PS2")
        .text("PS2")
      )
      .append($("<option>")
        .attr("value", "Prod")
        .text("Prod")
      )
    )
}

function instancesInput() {
  return $("<td>")
    .addClass("instances")
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "")
      .attr("type", "number")
    )
}

function vcpuInput() {
  return $("<td>")
    .addClass("vcpu")
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "")
      .attr("type", "number")
    )
}

function ramInput() {
  return $("<td>")
    .addClass("ram")
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function localStorageInput() {
  return $("<td>")
    .addClass("local-storage")
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function sizeInput() {
  return $("<td>")
    .addClass("size")
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function replicationCheckbox() {
  return $("<td>")
    .addClass("replication center-align")
    .append($("<label>")
      .append($("<input>")
        .attr("type", "checkbox")
      )
      .append($("<span></span>"))
    )
}

function backupCheckbox() {
  return $("<td>")
    .addClass("backup center-align")
    .append($("<label>")
      .append($("<input>")
        .attr("type", "checkbox")
      )
      .append($("<span></span>"))
    )
}

function monthlyBillingOutput() {
  return $("<td>")
    .addClass("monthly-billing money")
    .text("0")
}
