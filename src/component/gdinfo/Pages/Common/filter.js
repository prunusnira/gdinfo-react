import React, {Component} from 'react';

class Filter extends Component {
    render() {
        return (
            <div id='filters' class='filters'>
                <div id='filterShowHide' class='filter-front'>
                    <a href='#' onclick='showfilter(1)'>
                        <h3>Show Option Table</h3>
                        <script>document.write(text.other.filter[lang])</script>
                    </a>
                </div>
                <form id='filterform'>
                    <div id='filter' style="display:none;">
                        <div class='filter-ver'>
                            <div class='filter-front'>Version</div>
                            <div class='div-table-row filter-back' id='verfilter'></div>
                        </div>
                        <div class='filter-hot'>
                            <div class='filter-front'>Hot/Other</div>
                            <div class='div-table-row filter-back'>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='checkbox' name='hot[]' value='h' />Hot</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='checkbox' name='hot[]' value='o' />Other</label>
                                </div>
                            </div>
                        </div>
                        <div class='order'>
                            <div class='filter-front'>Order</div>
                            <div class='div-table-row filter-back'>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='titleasc' />Title ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='titledesc' />Title ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='verasc' />Version ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='verdesc' />Version ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gbscasc' />BSC-G ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gbscdesc' />BSC-G ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gadvasc' />ADV-G ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gadvdesc' />ADV-G ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gextasc' />EXT-G ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gextdesc' />EXT-G ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gmasasc' />MAS-G ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='gmasdesc' />MAS-G ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bbscasc' />BSC-B ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bbscdesc' />BSC-B ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='badvasc' />ADV-B ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='badvdesc' />ADV-B ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bextasc' />EXT-B ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bextdesc' />EXT-B ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bmasasc' />MAS-B ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='bmasdesc' />MAS-B ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dbscasc' />BSC-D ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dbscdesc' />BSC-D ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dadvasc' />ADV-D ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dadvdesc' />ADV-D ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dextasc' />EXT-D ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dextdesc' />EXT-D ▼</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dmasasc' />MAS-D ▲</label>
                                </div>
                                <div class='div-table-cell filter-obj'>
                                    <label><input type='radio' name='order' value='dmasdesc' />MAS-D ▼</label>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center;">
                            <div class='div-table-cell filter-obj'>
                                <input class='btn btn-primary' onclick="applyfilterP('ptrank')" type='button' value='Apply' />
                            </div>
                            <div class='div-table-cell filter-obj'>
                                <input class='btn btn-default' onclick='filterReset()' type='button' value='Reset' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter;