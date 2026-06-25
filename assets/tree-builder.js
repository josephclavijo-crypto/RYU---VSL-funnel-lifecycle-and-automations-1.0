/* ============================================================
   RYU GTM Automation System — tree builder
   Reusable engine for rendering an expandable decision tree
   from a small set of node-constructor calls. Each workflow
   page builds its tree by composing trigger(), action(),
   waitNode(), and gate() calls, then calls renderTree().
   ============================================================ */

(function (global) {
  var counter = 0;
  function uid(prefix) {
    counter++;
    return prefix + '-' + counter;
  }

  function paramRows(params) {
    if (!params || !params.length) return '';
    var rows = '';
    for (var i = 0; i < params.length; i++) {
      rows +=
        '<div class="param-row"><span class="param-key">' +
        params[i][0] +
        '</span><span class="param-val">' +
        params[i][1] +
        '</span></div>';
    }
    return rows;
  }

  function renderNode(opts) {
    // opts: { icon, iconClass, title, sub, params }
    var id = uid('node');
    var hasParams = opts.params && opts.params.length > 0;
    var html = '<div class="node" id="' + id + '">';
    html += '<div class="node-head" data-toggle="' + id + '">';
    html +=
      '<div class="node-icon ' +
      opts.iconClass +
      '">' +
      (opts.icon || '') +
      '</div>';
    html +=
      '<div><p class="node-title">' +
      opts.title +
      '</p><p class="node-sub">' +
      opts.sub +
      '</p></div>';
    if (hasParams) {
      html += '<span class="chev">&#8250;</span>';
    }
    html += '</div>';
    if (hasParams) {
      html +=
        '<div class="node-detail"><div class="params">' +
        paramRows(opts.params) +
        '</div></div>';
    }
    html += '</div>';
    return html;
  }

  function trigger(title, sub, params) {
    return renderNode({
      icon: 'TR',
      iconClass: 'c-trigger',
      title: title,
      sub: sub || 'Workflow start',
      params: params
    });
  }

  function action(title, sub, params) {
    return renderNode({
      icon: 'A',
      iconClass: 'c-action',
      title: title,
      sub: sub || 'Action',
      params: params
    });
  }

  function waitNode(label, sub) {
    return renderNode({
      icon: 'W',
      iconClass: 'c-wait',
      title: label,
      sub: sub || 'Wait',
      params: null
    });
  }

  function endNode(label) {
    return (
      '<div class="end-node"><span class="dot"></span>End — ' +
      label +
      '</div>'
    );
  }

  /**
   * gate(): renders an IF/ELSE node plus its two branches.
   * yesContent / noContent are pre-rendered HTML strings
   * (use endNode() or chains of action/gate calls).
   */
  function gate(title, sub, params, yesContent, noContent) {
    var html = '<div class="indent">';
    html += renderNode({
      icon: 'IF',
      iconClass: 'c-cond',
      title: title,
      sub: sub || 'Condition / if-else',
      params: params
    });
    html += '<div class="branch-label lbl-yes">YES</div>';
    html += yesContent;
    html += '<div class="branch-label lbl-no">NO</div>';
    html += noContent;
    html += '</div>';
    return html;
  }

  function renderTree(containerId, html) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = html;
    el.addEventListener('click', function (e) {
      var head = e.target.closest('[data-toggle]');
      if (!head) return;
      var id = head.getAttribute('data-toggle');
      var node = document.getElementById(id);
      if (node) node.classList.toggle('open');
    });
  }

  global.WorkflowTree = {
    trigger: trigger,
    action: action,
    wait: waitNode,
    gate: gate,
    end: endNode,
    render: renderTree
  };
})(window);
