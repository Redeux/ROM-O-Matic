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

  $(document).on('click', ".delete-row", deleteRow);

  $(document).on('change', "input, select", setTdValue);
});

function setTdValue() {
  const closestTd = $(this).closest('td');
  ($(this).attr("type") === 'checkbox') ? closestTd.data('value', $(this).is(':checked')): closestTd.data('value', $(this).val());

  return calculateRowCost(closestTd.closest('tr'));
}

function calculateRowCost(row) {
  const children = row.children();

  if (row.hasClass('compute')) {
    if (validateComputeInput(children)) {

      const perCPUPrice = 1.12;
      const perGBStoragePrice = .09;
      const replicationPrice = 15;
      const backupGBPrice = .045;
      const windowsPrice = 50;
      const linuxPrice = 40;

      const quantity = parseFloat($(children[3]).data('value'));
      //   console.log(`quantity: ${quantity}`);
      const os = $(children[4]).data('value');
      //   console.log(`os: ${os}`);
      const vcpu = parseFloat($(children[5]).data('value'));
      //   console.log(`vcpu: ${vcpu}`);
      const ram = parseFloat($(children[6]).data('value'));
      //   console.log(`ram: ${ram}`);
      const localStorage = parseFloat($(children[7]).data('value'));
      //   console.log(`localStorage: ${localStorage}`);
      const replication = $.parseJSON($(children[8]).data('value'));
      //   console.log(`replication: ${replication}`);
      const backup = $.parseJSON($(children[9]).data('value'));
      //   console.log(`backup: ${backup}`);

      // Each CPU comes with 4GB RAM.  If more than 4 is used the cost of additional CPUs is added
      const computeAllocation = (Math.ceil(ram / 4) > vcpu) ? Math.ceil(ram / 4) : vcpu;
      //   console.log(`ComputeAllocation: ${computeAllocation}`)

      const computeCost = computeAllocation * perCPUPrice
      //   console.log(`compute cost: ${computeCost}`);
      const storageCost = localStorage * perGBStoragePrice;
      //   console.log(`storage cost: ${storageCost}`);
      // additional storage on the remote side + 20% data journal + replication software license
      const replicationCost = (replication) ? (storageCost * 1.2) + replicationPrice : 0;
      //   console.log(`replication cost: ${replicationCost}`);
      // 30% change
      const backupCost = (backup) ? (localStorage * 1.3) * backupGBPrice : 0;
      //   console.log(`backup cost: ${backupCost}`);
      const osCost = (os === 'Windows') ? windowsPrice : linuxPrice;
      //   console.log(`os cost: ${osCost}`);

      const totalCost = parseFloat(quantity * (computeCost + osCost + storageCost + replicationCost + backupCost)).toFixed(2);
      $(children[10]).text(totalCost);
    }

  }
  if (row.hasClass('storage')) {
    if (validateStorageInput(children)) {
      const perGBFlashStoragePrice = .09;
      const perGBSATAStoragePrice = .06;
      const replicationPrice = 15;
      const backupGBPrice = .045;

      const storageClass = $(children[3]).data('value');
      console.log(`storageClass: ${storageClass}`);
      //   const size = $(children[4]).data('value');
      console.log(`size: ${size}`);
      const replication = $.parseJSON($(children[5]).data('value'));
      // console.log(`replication: ${replication}`);
      const backup = $.parseJSON($(children[6]).data('value'));
      // console.log(`backup: ${backup}`);

      const storageCost = (storageClass === 'flash') ? size * perGBFlashStoragePrice : size * perGBSATAStoragePrice;
      // console.log(`storage cost: ${storageCost}`);
      // additional storage on the remote side + 20% data journal + replication software license
      const replicationCost = (replication) ? (storageCost * 1.2) + replicationPrice : 0;
      // console.log(`replication cost: ${replicationCost}`);
      // 30% change
      const backupCost = (backup) ? (size * 1.3) * backupGBPrice : 0;
      // console.log(`backup cost: ${backupCost}`);

      const totalCost = parseFloat(storageCost + replicationCost + backupCost).toFixed(2);
      $(children[7]).text(totalCost);
    }
  }
  if (row.hasClass('database')) {
    if (validateDatabaseInput(children)) {

      const perCPUPrice = 1.12;
      const perGBStoragePrice = .09;
      const replicationPrice = 15;
      const backupGBPrice = .045;
      const windowsPrice = 50;
      const linuxPrice = 40;
      const postgresPrice = 5;
      const mssqlPrice = 10;
      const couchBasePrice = 7;
      let dbCost = 0;

      const quantity = parseFloat($(children[3]).data('value'));
      //   console.log(`quantity: ${quantity}`);
      const vcpu = parseFloat($(children[5]).data('value'));
      //   console.log(`vcpu: ${vcpu}`);
      const ram = parseFloat($(children[6]).data('value'));
      //   console.log(`ram: ${ram}`);
      const localStorage = parseFloat($(children[7]).data('value'));
      //   console.log(`localStorage: ${localStorage}`);
      const replication = $.parseJSON($(children[8]).data('value'));
      //   console.log(`replication: ${replication}`);
      const backup = $.parseJSON($(children[9]).data('value'));
      //   console.log(`backup: ${backup}`);

      // Each CPU comes with 4GB RAM.  If more than 4 is used the cost of additional CPUs is added
      const computeAllocation = (Math.ceil(ram / 4) > vcpu) ? Math.ceil(ram / 4) : vcpu;
      //   console.log(`ComputeAllocation: ${computeAllocation}`)

      const computeCost = computeAllocation * perCPUPrice
      //   console.log(`compute cost: ${computeCost}`);
      const storageCost = localStorage * perGBStoragePrice;
      //   console.log(`storage cost: ${storageCost}`);
      // additional storage on the remote side + 20% data journal + replication software license
      const replicationCost = (replication) ? (storageCost * 1.2) + replicationPrice : 0;
      //   console.log(`replication cost: ${replicationCost}`);
      // 30% change
      const backupCost = (backup) ? (localStorage * 1.3) * backupGBPrice : 0;
      //   console.log(`backup cost: ${backupCost}`);
      const osCost = (row.hasClass('mssql')) ? windowsPrice : linuxPrice;
      //   console.log(`os cost: ${osCost}`);

      if (row.hasClass('postgres'))  dbCost = postgresPrice;
      if (row.hasClass('mssql'))  dbCost = mssqlPrice;
      if (row.hasClass('couchbase'))  dbCost = couchBasePrice;

      const totalCost = parseFloat(quantity * (computeCost + osCost +  dbCost + storageCost + replicationCost + backupCost)).toFixed(2);
      $(children[10]).text(totalCost);
    }

  }
  return updateTotalCost();

}

function updateTotalCost() {
  let monthlyCost = 0;
  const activeRows = $('tbody').children();
  [...activeRows].forEach(function (elem) {
    monthlyCost += parseFloat($(elem).children().last().text());
  })
  $("#monthly-cost").text(monthlyCost.toFixed(2));
  $("#annual-cost").text((monthlyCost * 12).toFixed(2));
}


function validateComputeInput(data) {

  if ($(data[3]).data('value') === undefined) return false; // quantity
  if ($(data[4]).data('value') === undefined) return false; // OS
  if ($(data[5]).data('value') === undefined) return false; // vCPU
  if ($(data[6]).data('value') === undefined) return false; // RAM
  if ($(data[7]).data('value') === undefined) return false; // Local Storage
  return true;
}

function validateStorageInput(data) {
  console.log('validateStorageInput');

  if ($(data[3]).data('value') === undefined) return false; // storage class
  if ($(data[4]).data('value') === undefined) return false; // size
  return true;
}

function validateDatabaseInput(data) {

    if ($(data[3]).data('value') === undefined) return false; // quantity
    if ($(data[5]).data('value') === undefined) return false; // OS
    if ($(data[6]).data('value') === undefined) return false; // vCPU
    if ($(data[7]).data('value') === undefined) return false; // RAM
    if ($(data[8]).data('value') === undefined) return false; // Local Storage
    return true;
  }


function addIntelVMRow() {
  const intelVM = $('<tr>').addClass('no-border compute intel-vm')
    .append(removeButton)
    .append(descriptionInput('frontend'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'OS')
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
  const powerVM = $('<tr>').addClass('no-border compute power-vm')
    .append(removeButton)
    .append(descriptionInput('backend'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'OS')
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
  const container = $('<tr>').addClass('no-border compute container')
    .append(removeButton)
    .append(descriptionInput('service'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'base-image')
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
  const NFS = $('<tr>').addClass('no-border storage nfs')
    .append(removeButton)
    .append(descriptionInput('server files'))
    .append(regionSelect)
    .append($("<td>")
      .data('type', 'storage-class')
      .data('value', 'flash')
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
  const block = $('<tr>').addClass('no-border storage block')
    .append(removeButton)
    .append(descriptionInput('cluster store'))
    .append(regionSelect)
    .append($("<td>")
      .data('type', 'storage-class')
      .data('value', 'flash')
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
  const object = $('<tr>').addClass('no-border storage object')
    .append(removeButton)
    .append(descriptionInput('images'))
    .append(regionSelect)
    .append($("<td>")
      .data('type', 'storage-class')
      .data('value', 'SATA')
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
  const postgreSQL = $('<tr>').addClass('no-border database postgres')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'version')
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
  const msSQL = $('<tr>').addClass('no-border database mssql')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'version')
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
  const couchBase = $('<tr>').addClass('no-border database couchbase')
    .append(removeButton)
    .append(descriptionInput('app db'))
    .append(regionSelect)
    .append(quantityInput)
    .append($("<td>")
      .data('type', 'version')
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
    .data('type', 'button')
    .append($("<div>")
      .addClass("valign-wrapper")
      .append($("<i>")
        .addClass("small material-icons red-text text-darken-2 delete-row")
        .text("remove_circle")
      ))
}

function descriptionInput(desc) {
  return $("<td>")
    .data('type', 'description')
    .append($("<input>")
      .attr("placeholder", desc)
      .attr("type", "text")
    )
}

function regionSelect() {
  return $("<td>")
    .data('type', 'region')
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

function quantityInput() {
  return $("<td>")
    .data('type', 'quantity')
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "")
      .attr("type", "number")
    )
}

function vcpuInput() {
  return $("<td>")
    .data('type', 'vcpu')
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "")
      .attr("type", "number")
    )
}

function ramInput() {
  return $("<td>")
    .data('type', 'ram')
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function localStorageInput() {
  return $("<td>")
    .data('type', 'local-storage')
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function sizeInput() {
  return $("<td>")
    .data('type', 'size')
    .append($("<input>")
      .addClass("validate")
      .attr("placeholder", "GB")
      .attr("type", "number")
    )
}

function replicationCheckbox() {
  return $("<td>")
    .data('type', 'replication')
    .data('value', 'false')
    .addClass("center-align")
    .append($("<label>")
      .append($("<input>")
        .attr("type", "checkbox")
      )
      .append($("<span></span>"))
    )
}

function backupCheckbox() {
  return $("<td>")
    .data('type', 'backup')
    .data('value', 'false')
    .addClass("center-align")
    .append($("<label>")
      .append($("<input>")
        .attr("type", "checkbox")
      )
      .append($("<span></span>"))
    )
}

function monthlyBillingOutput() {
  return $("<td>")
    .data('type', 'billing')
    .addClass("money")
    .text("0")
}
