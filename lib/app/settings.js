
var slugify = require('slugify');


/**
 * Insert new tables and columns for a settings object.
 *
 * @param {Object} settings
 * @param {Object} info
 * @param {Function} callback
 * @api public
 */

exports.refresh = function (settings, info) {
  for (var table in info) {
    var view = info[table].__view;
    delete info[table].__view;

    var columns = info[table],
      pk = primaryKey(columns);

    if (settings[table] === undefined) {
      settings[table] = createTable(table, pk, view);
    }

    for (var name in columns) {
      if (exists(settings[table].columns, name)) continue;

      settings[table].columns.push(createColumn(name, columns[name]));

      // STEFAN: add all column names as filterable except id
      // TODO: filter on id. Express admin attempts to SELECT on id from postgres. But it's passed as a string?
      // Express admin crashes when trying to make this SELECT statement
      if (name !== 'id') {
        settings[table].listview.filter.push(name);
      }
    }
  }
  return settings;
}

/**
 * Check for column existence.
 *
 * @param {Array} columns
 * @param {String} name
 * @api private
 */

function exists (columns, name) {
  for (var i = 0; i < columns.length; i++) {
    if (columns[i].name == name) return true;
  }
  return false;
}

/**
 * Create settings object for a table.
 *
 * @param {String} name
 * @param {String} pk
 * @api private
 */

function createTable (name, pk, view) {
  // STEFAN: don't display association tables. Predicate on multiple primary keys.
  // if (Array.isArray(pk)) {
  //   return {
  //     slug: slugify(name),
  //     table: {
  //       name: name,
  //       pk: pk,
  //       verbose: name,
  //       view: view
  //     },
  //     columns: [],
  //     mainview: {
  //       show: false
  //     },
  //     listview: {
  //       order: {},
  //       // STEFAN: default 200 entities per page.
  //       page: 200,
  //     // STEFAN ability to filter by all fields by default
  //     filter: []
  //     },
  //     editview: {
  //       readonly: false
  //     }
  //   };
  // }
  return {
    slug: slugify(name),
    table: {
      name: name,
      pk: pk,
      verbose: name,
      view: view
    },
    columns: [],
    mainview: {
      show: true
    },
    listview: {
      order: {},
      // STEFAN: default 200 entities per page.
      page: 200,
      // STEFAN ability to filter by all fields by default
      filter: []
    },
    editview: {
      readonly: false
    }
  };
}

/**
 * Create a settings object for a column.
 *
 * @param {String} name
 * @param {Object} info
 * @param {Number} idx
 * @api private
 */

function createColumn (name, info) {
  const newColumn = {};

  Object.assign(newColumn, info, { name })

  newColumn.verbose = name

  // STEFAN: set control types for template system generation of filterview and editview.
  // See /express-admin/views/listview/column.html
  if (info.type === 'integer') {
    newColumn.control = { number: true }
  } else if (info.type === 'timestamp') {
    newColumn.control = { datetime: true }
  } else {
    newColumn.control = { text: true }
  }

  newColumn.listview = { show: true }

  // STEFAN: Don't edit timestamps or IDs.
  if (name === 'id' || name === 'createdAt' || name === 'updatedAt') {
    newColumn.editview = { show: false }
  } else {
    newColumn.editview = { show: true }
  }

  return newColumn
}

/**
 * Get the first found primary key from a given table's columns list.
 *
 * @param {Object} columns
 * @api private
 */

function primaryKey (columns) {
  var pk = [];
  for (var name in columns) {
    for (var property in columns[name]) {
      if (columns[name][property] === 'pri') {
        pk.push(name);
      }
    }
  }
  return !pk.length ? '' : (pk.length > 1 ? pk : pk[0]);
}
