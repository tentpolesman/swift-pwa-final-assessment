import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IcubeMaps from '@common_googlemaps';
import Header from '@common_headermobile';
import Button from '@common_button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '@common_textfield';
import Typography from '@common_typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CustomAutocomplete from '../../../../commons/AutoComplete';
import useStyles from './style';

const AddressView = (props) => {
    const {
        t, open, setOpen, pageTitle, formik, addressState, getCities,
        mapPosition, handleDragPosition, disableDefaultAddress, loading, success, gmapKey, enableSplitCity,
        getCountries, resultCountries, responCities, getRegion, resultRegion,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: pageTitle || t('customer:address:addTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };
    const addBtn = success ? styles.addBtnSuccess : styles.addBtn;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const getCountriesRender = () => (
        <div className={styles.boxField}>
            <CustomAutocomplete
                enableCustom={false}
                mode="lazy"
                value={formik.values.country}
                onChange={(e) => {
                    formik.setFieldValue('country', e);
                    formik.setFieldValue('region', null);
                }}
                loading={resultCountries.loading}
                options={
                    resultCountries
                    && resultCountries.data
                    && resultCountries.data.countries
                }
                getOptions={getCountries}
                name="country"
                label={t('common:form:country')}
                primaryKey="id"
                labelKey="full_name_locale"
            />
        </div>
    );

    // regions is state/province
    // eslint-disable-next-line arrow-body-style
    const getRegionRender = () => {
        return (
            <div className={styles.boxField}>
                <CustomAutocomplete
                    enableCustom={false}
                    disabled={!formik.values.country}
                    mode="lazy"
                    value={formik.values.region}
                    onChange={(e) => {
                        formik.setFieldValue('region', e);
                        formik.setFieldValue('city', null);
                    }}
                    loading={resultRegion.loading}
                    options={
                        resultRegion
                        && resultRegion.data
                        && resultRegion.data.getRegions
                        && resultRegion.data.getRegions.item
                    }
                    getOptions={getRegion}
                    getOptionsVariables={{
                        variables: {
                            country_id: formik.values.country ? formik.values.country.id : '0',
                        },
                    }}
                    name="region"
                    label={t('common:form:state')}
                    primaryKey="region_id"
                    labelKey="name"
                />
            </div>
        );
    };

    // city or kabupaten
    // eslint-disable-next-line arrow-body-style
    const getCityRender = () => {
        // console.log(addressState.dropdown.city);
        return (
            <div className={styles.boxField}>
                <CustomAutocomplete
                    disabled={!formik.values.region}
                    mode="lazy"
                    value={formik.values.city}
                    onChange={(e) => {
                        formik.setFieldValue('city', e);
                    }}
                    loading={responCities.loading}
                    options={
                        !enableSplitCity ? (
                            resultRegion
                            && responCities.data
                            && responCities.data.getCityByRegionId
                            && responCities.data.getCityByRegionId.item
                        ) : (
                            addressState.dropdown.city && addressState.dropdown.city.length
                                && addressState.dropdown.city
                        )
                    }
                    getOptions={getCities}
                    getOptionsVariables={{
                        variables: {
                            regionId: formik.values.region ? formik.values.region.region_id : '0',
                        },
                    }}
                    name="city"
                    label={t('common:form:city')}
                    primaryKey="id"
                    labelKey={enableSplitCity ? 'label' : 'city'}
                />
            </div>
        );
    };
    // district / kecamatan
    const getDistrictRender = () => {
        if (addressState.dropdown.district && addressState.dropdown.district.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.city}
                    options={addressState.dropdown.district}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-district"
                    value={!formik.values.district ? null : formik.values.district}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('district', newValue);
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autocorrect: 'off',
                                    autocapitalize: 'none',
                                    spellcheck: 'false',
                                }}
                                name={`district_${new Date().getTime()}`}
                                label="Kecamatan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.district && formik.errors.district)}
                            />
                            <Typography variant="p" color={formik.touched.district && formik.errors.district ? 'red' : 'default'}>
                                {formik.touched.district && formik.errors.district}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.city}
                autoComplete="new-password"
                label="Kecamatan"
                name="district"
                value={formik.values.district ? formik.values.district.label : ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.district && formik.errors.district)}
                errorMessage={(formik.touched.district && formik.errors.district) || null}
            />
        );
    };

    const getVillageRender = () => {
        if (addressState.dropdown.village && addressState.dropdown.village.length && open) {
            return (
                <Autocomplete
                    disabled={!formik.values.district}
                    options={addressState.dropdown.village}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-village"
                    value={!formik.values.village ? null : formik.values.village}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('village', newValue);
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                inputProps={{
                                    ...params.inputProps,
                                    autocorrect: 'off',
                                    autocapitalize: 'none',
                                    spellcheck: 'false',
                                }}
                                name={`village_${new Date().getTime()}`}
                                label="Kelurahan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.village && formik.errors.village)}
                            />
                            <Typography variant="p" color={formik.touched.village && formik.errors.village ? 'red' : 'default'}>
                                {formik.touched.village && formik.errors.village}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                disabled={!formik.values.district}
                autoComplete="new-password"
                label="Kelurahan"
                name="village"
                value={formik.values.village ? formik.values.village.label : ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.village && formik.errors.village)}
                errorMessage={(formik.touched.village && formik.errors.village) || null}
            />
        );
    };

    return (
        <Dialog open={open} className={[styles.address_drawer].join(' ')} maxWidth="sm" fullWidth={!!isDesktop} fullScreen={!isDesktop}>
            <div className={styles.container}>
                <Header
                    pageConfig={headerConfig}
                    LeftComponent={{
                        onClick: () => {
                            formik.resetForm();
                            setOpen();
                        },
                    }}
                    className={styles.pageTitle}
                />
                <div className={[styles.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit} autoComplete="new-password">
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:firstName')}
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            errorMessage={(formik.touched.firstname && formik.errors.firstname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:lastName')}
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            errorMessage={(formik.touched.lastname && formik.errors.lastname) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:street')}
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={(formik.touched.street && formik.errors.street) || null}
                        />
                        {open && getCountriesRender()}
                        {open && getRegionRender()}
                        {open && getCityRender()}
                        {enableSplitCity ? getDistrictRender() : null}
                        {enableSplitCity ? getVillageRender() : null}
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:postal')}
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            errorMessage={(formik.touched.postcode && formik.errors.postcode) || null}
                        />
                        <CustomTextField
                            autoComplete="new-password"
                            label={t('common:form:phoneNumber')}
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
                        />
                        {gmapKey && (
                            <div className={styles.boxMap}>
                                <IcubeMaps height="230px" mapPosition={mapPosition} dragMarkerDone={handleDragPosition} gmapKey={gmapKey} />
                            </div>
                        )}

                        {disableDefaultAddress ? null : (
                            <div>
                                <FormControlLabel
                                    value={formik.values.defaultShippingBilling}
                                    checked={formik.values.defaultShippingBilling}
                                    onChange={() => formik.setFieldValue('defaultShippingBilling', !formik.values.defaultShippingBilling)}
                                    name="defaultShippingBilling"
                                    control={<Checkbox name="newsletter" color="primary" size="small" />}
                                    label={(
                                        <Typography variant="p" letter="capitalize" className="row center">
                                            {t('customer:address:useDefault')}
                                        </Typography>
                                    )}
                                />
                            </div>
                        )}

                        <div className={styles.wrapper}>
                            <Button className={addBtn} fullWidth type="submit" disabled={loading} loading={loading}>
                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                    {t(success ? 'common:button:saved' : 'common:button:save')}
                                </Typography>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default AddressView;
