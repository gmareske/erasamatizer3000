
var text_el = document.getElementById('text');
var master_text = text_el.innerHTML;

function erase(regexs) {
    let t = master_text + '';
    var templ = '<span class="blackout">$&</span>';
    for (var i = 0;i<regexs.length;i++) {
	t = t.replace(regexs[i],templ);
    }
    text_el.innerHTML = t;
    return t;
}
function erase_compound(regexs) {
    // does the replace but compounds on previous erases
    let t = text_el.innerHTML;
    var templ = '<span class="blackout">$&</span>';
    let ignore = /(?!<span class="blackout">.*<\/span>)/gm;
    for (var i = 0; i < regexs.length; i++) {
	let actual_regex = new RegExp('(' + regexs[i].source + ')' + ignore.source,
				     'gm');
	t = t.replace(actual_regex,
		      templ);
    }
    text_el.innerHTML = t;
    return t;
}

function text_reset() {
    text_el.innerHTML = master_text
}

function text_invert() {
    $('.blackout').toggleClass('invert');
    $('.blackout-area').toggleClass('invert');
}
function upload_input() {
    let input_el = document.getElementById('input_text')
    if (text = "") {
	input_el = document.getElementById('input_url');
		     // process url...
    }
    text_el.innerHTML = input_el.value;
    master_text = input_el.value;
    input_el.value = "";
    $('.choose_ui').addClass('hide');
}
// Event handlers
// text upload
$('#button_choose').click(() => {$('.choose_ui').removeClass('hide')});
$('#button_upload').click(upload_input);
// text inversion
$('#button_invert').click(text_invert);
// button reset
$('#button_reset').click(text_reset);
// User entered a regex, then clicked Erase!
$('#button_erase_regex').click(() => {
    let el = document.getElementById('erase_input_regex');
    let text = el.value;
    let regex = new RegExp(text);
    console.log('Going to do the erase with ' + regex);
    erase_compound([regex]);
    el.value = '';
});

