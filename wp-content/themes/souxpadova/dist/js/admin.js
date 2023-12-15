window.addEventListener('DOMContentLoaded', function () {

    jQuery('[data-wp-lists="list:user"] tr').each(function(){
        var role = jQuery(this).find('.role').text().toLowerCase().replace(/ /g, '_');
        jQuery(this).attr('role', role);
        jQuery(this).find('.row-actions .view').remove();
    });

    jQuery('[data-wp-lists="list:user"] [role]').not('body.administrator [data-wp-lists="list:user"] [role]').each(function(){
        if(jQuery(this).attr('role') != 'site_manager'){
            jQuery(this).remove();
        }
    });

    //SITE MANAGER
    jQuery('.site_manager select option[value="administrator"]').remove();
    jQuery('.site_manager select option[value="subscriber"]').remove();
    jQuery('.site_manager select option[value="contributor"]').remove();
    jQuery('.site_manager select option[value="author"]').remove();
    jQuery('.site_manager select option[value="editor"]').remove();

    jQuery('.site_manager #menu-appearance').remove();
    jQuery('.site_manager #wpbody .update-nag').remove();

    // Checkbox and SubCheckbox UI
    // jQuery('.post-type-file .kind-selection .acf-checkbox-list li, .post-type-registration-request [data-name="content_permission"] .acf-checkbox-list li, #profile-page [data-name="content_permission"] .acf-checkbox-list li').each(function(){
    //     if(jQuery(this).find('ul').length > 0){
    //         console.log(jQuery(this).find('ul').length);
    //         console.log(jQuery(this).find('input').is(":checked"));
    //         if(jQuery(this).find('input').is(":checked")){
    //             jQuery(this).find('ul').removeClass('hidden');
    //         } else {
    //             jQuery(this).find('ul').addClass('hidden');
    //         }
    //     }

    //     jQuery(this).find('input').on('click', function(){
    //         if(jQuery(this).parent().parent().find('ul').length > 0){
    //             if(jQuery(this).is(":checked")){
    //                 jQuery(this).parent().parent().find('ul').removeClass('hidden');
    //             } else {
    //                 jQuery(this).parent().parent().find('ul').addClass('hidden');
    //                 jQuery(this).parent().parent().find('ul li').each(function(){
    //                     jQuery(this).find('input').prop('checked', false);
    //                 });
    //             }
    //         }
    //     });
    // });
});
