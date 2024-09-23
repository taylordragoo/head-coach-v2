<template>
    <div class="layout-wrapper" :class="containerClass">
        <div class="layout-content-wrapper">
            <div class="layout-topbar-menu-section">
                <AppTopbar ref="topbarRef"></AppTopbar>
            </div>
            <div class="layout-content">
                <div class="grid">
                    <div class="col-12">
                        <div class="card">
                            <Toolbar class="mb-4">
                                <template v-slot:start>
                                    <div class="flex my-2">
                                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                                        <Button label="Export" icon="pi pi-download" class="p-button-help mr-2" @click="exportCSV($event)" />
                                    </div>
                                </template>

                                <template v-slot:end>
                                    <div class="flex justify-end">
                                        <Dropdown v-model="selected_team" :options="teams" option-label="name" class="w-12rem mr-2" />
                                        <Dropdown v-model="selected_type" :options="statuses" option-label="value" class="w-12rem" />
                                    </div>
                                </template>
                            </Toolbar>

                            <div v-if="selected_type.value == 'Team Info'">
                                <span class="text-900 text-xl font-bold mb-4 block">Edit Team</span>
                                <div class="grid">
                                    <div class="col-12 lg:col-2">
                                        <div class="text-900 font-medium text-xl mb-3">Profile</div>
                                        <p class="m-0 p-0 text-600 line-height-3 mr-3">Odio euismod lacinia at quis risus sed vulputate odio.</p>
                                    </div>
                                    <div class="col-12 lg:col-10">
                                        <div class="grid formgrid p-fluid">
                                            <div class="field mb-4 col-6">
                                                <label htmlFor="name" class="font-medium text-900"> Region </label>
                                                <InputText v-model="selected_team.region" id="name" type="text" />
                                            </div>
                                            <div class="field mb-4 col-6">
                                                <label htmlFor="nickname" class="font-medium text-900"> Nickname </label>
                                                <InputText v-model="selected_team.name" id="nickname" type="text" />
                                            </div>
                                            <div class="field mb-4 col-6">
                                                <label htmlFor="nickname" class="font-medium text-900"> Abbreviation </label>
                                                <InputText v-model="selected_team.abbreviation" id="nickname" type="text" />
                                            </div>
                                            <div class="field mb-4 col-12 md:col-6">
                                                <label htmlFor="country" class="font-medium text-900"> Country </label>
                                                <Dropdown 
                                                    @update:modelValue="val => selected_team.country = val.code"
                                                    :modelValue="selected_team.country"
                                                    :options="countries" 
                                                    optionLabel="name" 
                                                    :filter="true" 
                                                    placeholder="Select a Country"
                                                    :showClear="true" 
                                                >
                                                    <template #value="slotProps">
                                                        <div class="country-item country-item-value flex align-items-center" v-if="slotProps.value">
                                                            <span :class="`mr-2 flag flag-${countries.find(country => country.code === selected_team.country).code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                                            <div>{{ countries.find(country => country.code === selected_team.country).name }}</div>
                                                        </div>
                                                        <span v-else>
                                                            {{ slotProps.placeholder }}
                                                        </span>
                                                    </template>
                                                    <template #option="slotProps">
                                                        <div class="country-item flex align-items-center">
                                                            <span :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px; height: 12px" />
                                                            <div>{{ slotProps.option.name }}</div>
                                                        </div>
                                                    </template>
                                                </Dropdown>
                                            </div>
                                            <div class="col-12">
                                                <Button label="Save Team Info" class="w-auto mt-3"></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="selected_type.value == 'Staff'">
                                <TreeTable :value="staffTreeValue" loadingMode="icon" nodeIcon="none" class="w-full">
                                    <template #header> Team Staff </template>
                                    <Column dataKey="name" field="category" header="" :expander="true" style="width: 10%"></Column>
                                    <Column field="" header="" style="width: 10%">
                                        <template #body="{ node }">
                                            <div v-if="!node.children" class="flex flex-wrap gap-2 justify-content-center">
                                                <img :src="`/demo/images/avatar/${node.data.image}`" class="w-2rem mr-2" />
                                            </div>
                                        </template>
                                    </Column>
                                    <Column field="role" header="Role"></Column>
                                    <Column field="first_name" header="First Name"></Column>
                                    <Column field="last_name" header="Last Name"></Column>
                                    <Column field="age" header="Age"></Column>
                                    <Column field="contract_length" header="Contract Length"></Column>
                                    <Column field="contract_amount" header="Contract Amount"></Column>
                                    <Column field="" header="" style="width: 5%">
                                        <template #body="{ node }">
                                            <div v-if="!node.children" class="flex flex-wrap gap-2 justify-content-end">
                                                <Button type="button" class="p-button-rounded p-button-text z-3 ml-auto sm:ml-0" icon="pi pi-ellipsis-v" @click="toggle($event, node)" aria-haspopup="true" aria-controls="overlay_menu" />
                                                <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" styleClass="w-8rem" />
                                            </div> 
                                        </template>
                                    </Column>
                                </TreeTable>
                            </div>

                            <DataTable v-if="selected_type.value == 'Players'"
                                sortField="ratings.position" 
                                :value="selected_team.players" 
                                dataKey="id" 
                                paginator 
                                :rows="10" 
                                responsiveLayout="scroll"
                            >
                                <Column field="ratings.position" header="Position" default sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.position ?? '' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.position_archetype" header="Position Archetype" sortable :headerStyle="{ minWidth: '10rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center uppercase">
                                            <span>{{ data.ratings.position_archetype ?? '' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.mental_archetype" header="Mental Archetype" sortable :headerStyle="{ minWidth: '10rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center uppercase">
                                            <span>{{ data.ratings.mental_archetype ?? '' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="first_name" header="First Name" sortable :headerStyle="{ minWidth: '10rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center uppercase">
                                            <span>{{ data.first_name ?? '' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="last_name" header="Last Name" sortable :headerStyle="{ minWidth: '10rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center uppercase">
                                            <span>{{ data.last_name ?? '' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="" header="" :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex flex-wrap gap-2 justify-content-end">
                                            <Button type="button" class="p-button-rounded p-button-text z-3 ml-auto sm:ml-0" icon="pi pi-pencil" @click="toggle_player_edit($event, data)" />
                                        </div> 
                                    </template>
                                </Column>
                                <!-- <Column field="ratings.speed" header="SPD" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.speed ?? '2' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.acceleration" header="ACC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.acceleration ?? '3' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.agility" header="AGI" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.agility ?? '4' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.strength" header="STR" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.strength ?? '5' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.vertical" header="VER" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.vertical ?? '6' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.stamina" header="STA" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.stamina ?? '7' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.carrying" header="CAR" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.carrying ?? '8' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.catching" header="CTH" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.catching ?? '9' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.route_running" header="ROR" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.route_running ?? '10' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.throw_power" header="THP" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.throw_power ?? '11' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.throw_accuracy_deep" header="DAC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.throw_accuracy_deep ?? '12' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.throw_accuracy_mid" header="MAC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.throw_accuracy_mid ?? '13' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.throw_accuracy_short" header="SAC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.throw_accuracy_short ?? '14' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.throw_on_the_run" header="TOR" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.throw_on_the_run ?? '15' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.play_action" header="ACT" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.play_action ?? '16' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.pass_blocking" header="PBL" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.pass_blocking ?? '17' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.run_blocking" header="RBL" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.run_blocking ?? '18' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.shed_block" header="SHD" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.shed_block ?? '19' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.tackle" header="TKL" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.tackle ?? '20' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.man_coverage" header="MCV" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.man_coverage ?? '21' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.zone_coverage" header="ZCV" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.zone_coverage ?? '22' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.punt_accuracy" header="PAC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.punt_accuracy ?? '23' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.punt_power" header="PPW" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.punt_power ?? '24' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.kick_accuracy" header="KAC" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.kick_accuracy ?? '25' }}</span>
                                        </div>
                                    </template>
                                </Column>
                                <Column field="ratings.kick_power" header="KPW" sortable :headerStyle="{ minWidth: '5rem' }">
                                    <template #body="{ data }">
                                        <div class="flex align-items-center">
                                            <span>{{ data.ratings.kick_power ?? '26' }}</span>
                                        </div>
                                    </template>
                                </Column> -->
                            </DataTable>

                            <Dialog v-model:visible="staffDialog" :style="{ width: '46rem' }" :draggable="false" :closable="true" header="Edit Staff" :modal="true" class="p-fluid">
                                <img :src="'/demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                                <div class="field">
                                    <label for="first_name">First Name</label>
                                    <InputText id="first_name" v-model.trim="staffEditObject.first_name" required="true" autofocus :class="{ 'p-invalid': submitted && !staffEditObject.first_name }" />
                                    <small class="p-invalid" v-if="submitted && !staffEditObject.first_name">Name is required.</small>
                                </div>
                                <div class="field">
                                    <label for="last_name">Last Name</label>
                                    <InputText id="last_name" v-model.trim="staffEditObject.last_name" required="true" autofocus :class="{ 'p-invalid': submitted && !staffEditObject.last_name }" />
                                    <small class="p-invalid" v-if="submitted && !staffEditObject.last_name">Name is required.</small>
                                </div>
                                <div class="field">
                                    <label for="birth_year">Birth Year</label>
                                    <InputText id="birth_year" v-model.trim="staffEditObject.birth_year" required="true" autofocus :class="{ 'p-invalid': submitted && !staffEditObject.birth_year }" />
                                    <small class="p-invalid" v-if="submitted && !staffEditObject.birth_year">Name is required.</small>
                                </div>

                                <TabView>
                                    <TabPanel header="Mental">
                                        <div class="formgrid grid px-2 mt-3">
                                            <div class="col-6 border-right-1 border-gray-700">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full text-left">
                                                        <label for="leadership">Leadership</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="leadership" v-model="staffEditObject.leadership" :class="{ 'p-invalid': submitted && !staffEditObject.leadership }" :required="true" />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="leadership">Adaptability</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="adaptability" v-model="staffEditObject.adaptability" :class="{ 'p-invalid': submitted && !staffEditObject.adaptability }" :required="true" />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="ambition">Ambition</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="ambition" v-model="staffEditObject.ambition" :class="{ 'p-invalid': submitted && !staffEditObject.ambition }" :required="true" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="discipline">Discipline</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="discipline" v-model="staffEditObject.discipline" :class="{ 'p-invalid': submitted && !staffEditObject.discipline }" :required="true" />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="motivation">Motivation</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="motivation" v-model="staffEditObject.motivation" :class="{ 'p-invalid': submitted && !staffEditObject.motivation }" :required="true" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Coaching">
                                        <div class="formgrid grid px-2 mt-3">
                                            <div class="col-6 border-right-1 border-gray-700">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full text-left">
                                                        <label for="leadership">Offense</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="offensive_technical" v-model="staffEditObject.offensive_technical" :class="{ 'p-invalid': submitted && !staffEditObject.offensive_technical }" :required="true" />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="throwing_technical">Throwing</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="throwing_technical" v-model="staffEditObject.throwing_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="hands_technical">Hands</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="hands_technical" v-model="staffEditObject.hands_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="routes_technical">Routes</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="routes_technical" v-model="staffEditObject.routes_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="blocking_technical">Blocking</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="blocking_technical" v-model="staffEditObject.blocking_technical" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="defensive_technical">Defense</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="defensive_technical" v-model="staffEditObject.defensive_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="tackling_technical">Tackling</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="tackling_technical" v-model="staffEditObject.tackling_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="coverage_technical">Coverage</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="coverage_technical" v-model="staffEditObject.coverage_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="kicking_technical">Kicking</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="kicking_technical" v-model="staffEditObject.kicking_technical" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="punting_technical">Punting</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="punting_technical" v-model="staffEditObject.punting_technical" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Scouting">
                                        <div class="formgrid grid mt-3 px-2">
                                            <div class="col-6 border-right-1 border-gray-700">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="data_analysis">Analysis</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="data_analysis" v-model="staffEditObject.data_analysis" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="player_ability_analysis">Ability</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="player_ability_analysis" v-model="staffEditObject.player_ability_analysis" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="player_potential_analysis">Potential</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="player_potential_analysis" v-model="staffEditObject.player_potential_analysis" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="staff_ability_analysis">Staff</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="staff_ability_analysis" v-model="staffEditObject.staff_ability_analysis" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Experience">
                                        <div class="formgrid grid mt-3 px-2">
                                            <div class="col-6 border-right-1 border-gray-700">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="rookie_player_management">Rookies</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="rookie_player_management" v-model="staffEditObject.rookie_player_management" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="veteran_player_management">Veterans</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="veteran_player_management" v-model="staffEditObject.veteran_player_management" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="play_calling_ability">Playcalling</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="play_calling_ability" v-model="staffEditObject.play_calling_ability" integeronly />
                                                    </div>
                                                </div>
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="gameplan">Gameplan</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="gameplan" v-model="staffEditObject.gameplan" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header="Medical">
                                        <div class="formgrid grid mt-3 px-2">
                                            <div class="col-6 border-right-1 border-gray-700">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="athletic_training">Athletic Training</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="athletic_training" v-model="staffEditObject.athletic_training" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="field w-full inline-flex justify-content-between align-items-center">
                                                    <div class="w-full">
                                                        <label for="medical_training">Medical Training</label>
                                                    </div>
                                                    <div class="w-1/4">
                                                        <InputNumber id="medical_training" v-model="staffEditObject.medical_training" integeronly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabView>
                                <template #footer>
                                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveStaff" />
                                </template>
                            </Dialog>

                            <Dialog v-model:visible="playerDialog" header="Player Details" :draggable="false" :modal="true" class="p-fluid w-5 h-auto">

                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label for="First Name">First Name</label>
                                        <InputText id="first_name" v-model.trim="playerEditObject.first_name" required="true" autofocus :class="{ 'p-invalid': submitted && !playerEditObject.first_name }" />
                                        <small class="p-invalid" v-if="submitted && !playerEditObject.first_name">First Name is required.</small>
                                    </div>
                                    
                                    <div class="field col-6">
                                        <label for="Last Name">Last Name</label>
                                        <InputText id="last_name" v-model.trim="playerEditObject.last_name" required="true" autofocus :class="{ 'p-invalid': submitted && !playerEditObject.last_name }" />
                                        <small class="p-invalid" v-if="submitted && !playerEditObject.last_name">Last Name is required.</small>
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="inventoryStatus" class="mb-3">Position</label>
                                    <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" placeholder="Select...">
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value">
                                                <Badge :severity="getBadgeSeverity(slotProps.value.value || slotProps.value)">{{ slotProps.value.value || slotProps.value }}</Badge>
                                            </div>
                                        </template>
                                        <template #option="slotProps">
                                            <div>
                                                <Badge :severity="getBadgeSeverity(slotProps.option.value)">{{ slotProps.option.value }}</Badge>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>

                                <div class="formgrid grid">
                                    <div class="field col-6">
                                        <label for="inventoryStatus" class="mb-3">Position Archetype</label>
                                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" placeholder="Select...">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value">
                                                    <Badge :severity="getBadgeSeverity(slotProps.value.value || slotProps.value)">{{ slotProps.value.value || slotProps.value }}</Badge>
                                                </div>
                                            </template>
                                            <template #option="slotProps">
                                                <div>
                                                    <Badge :severity="getBadgeSeverity(slotProps.option.value)">{{ slotProps.option.value }}</Badge>
                                                </div>
                                            </template>
                                        </Dropdown>
                                    </div>

                                    <div class="field col-6">
                                        <label for="inventoryStatus" class="mb-3">Mental Archetype</label>
                                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" placeholder="Select...">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value">
                                                    <Badge :severity="getBadgeSeverity(slotProps.value.value || slotProps.value)">{{ slotProps.value.value || slotProps.value }}</Badge>
                                                </div>
                                            </template>
                                            <template #option="slotProps">
                                                <div>
                                                    <Badge :severity="getBadgeSeverity(slotProps.option.value)">{{ slotProps.option.value }}</Badge>
                                                </div>
                                            </template>
                                        </Dropdown>
                                    </div>
                                </div>

                                <template #footer>
                                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                                </template>
                            </Dialog>

                            <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                                <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span v-if="product"
                                        >Are you sure you want to delete <b>{{ product.name }}</b
                                        >?</span
                                    >
                                </div>
                                <template #footer>
                                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                                </template>
                            </Dialog>

                            <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                                <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span v-if="product">Are you sure you want to delete the selected products?</span>
                                </div>
                                <template #footer>
                                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
                                </template>
                            </Dialog>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, computed, watch } from 'vue';
import TreeTable from 'primevue/treetable';
import Menu from 'primevue/menu';
import { ProductService } from '@/service/ProductService';
import { NodeService } from '@/service/NodeService';
import { CustomerService } from '@/service/CustomerService';
import { useToast } from 'primevue/usetoast';
import { DatabaseController, CareerController } from "@/controllers/";
import Utilities from "../../utils/utilities.ts";
import World from "../../models/World";
import League from "../../models/League";
import User from "../../models/User";
import Team from "../../models/Team";
import Player from "../../models/Player";
import Staff from "../../models/Staff";
import { useLayout } from '@/layout/composables/layout';
import AppTopbar from '../../layout/AppTopbar.vue';

// *********** OLD SHIT ****************
const toast = useToast();
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const productService = new ProductService();
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'USA' }
]);
const selectedCountry = ref(null);
const nodeService = new NodeService();
const curtomerService = new CustomerService();
const customers = ref([]);
// ************************************

const menuItems = ref([
    { label: 'Edit', icon: 'pi pi-pencil', command: () => openNew() },
    { label: 'Fire', icon: 'pi pi-trash', command: () => handleDelete() },
]);
const menu = ref(null);
const clickedTask = ref(null);
const statuses = ref([{ value: 'Team Info' }, { value: 'Staff' }, { value: 'Players' }]);
const world = ref(null);
const leagues = ref([]);
const teams = ref([]);
const players = ref([]);
const selected_team = ref([{ name: 'Select...' }]);
const selected_type = ref(statuses.value[0]);
const careerController = CareerController.getInstance();
const databaseController = DatabaseController.getInstance();
const staffTreeValue = ref([]);
const playerDialog = ref(false);
const staffDialog = ref(false);
const staffEditObject = ref(null);
const playerEditObject = ref(null);

onBeforeMount(() => {
    initFilters();
});
onMounted(async () => {
    productService.getProducts().then((data) => (products.value = data));
    customers.value = await curtomerService.getCustomersLarge();
    await getDefaultDatabase().then(() => {
        selected_team.value = teams.value[0];
    });
});
const getDefaultDatabase = async () => {
    console.log('default');
    await careerController.loadSelectedCareer('default');
    players.value = Player.all();
    teams.value = Team.query().with('players.*').all();
    leagues.value = League.all();
    world.value = World.query().with('leagues.teams.players.*').first()
}
const filteredTeam = computed(() => {
    if(selected_type.value != null) {
        if(selected_type.value.value == 'Team Info') {
            return selected_team.value;
        }
        if(selected_type.value.value == 'Staff') {
            return selected_team.value.staff;
        }
        if(selected_type.value.value == 'Players') {
            return selected_team.value.players;
        }
    }
})
const filteredStaff = computed(() => {
    let coaches = Staff.query().where('team_id', selected_team.value.tid).where('role', [
        'Head Coach', 
        'Offensive Coordinator', 
        'Defensive Coordinator',
        'QB Coach',
        "RB Coach",
        "TE Coach",
        "WR Coach",
        'OLine Coach',
        'DLine Coach',
        'Linebacker Coach',
        'Secondary Coach',
        'Special Teams Coach',
        'Strength Coach',
        'Coach'
    ]).get();
    let medical = Staff.query().where('team_id', selected_team.value.tid).where('role', [
        'Sports Medicine Director',
        'Doctor',
        'Trainer'
    ]).get();
    let scouting = Staff.query().where('team_id', selected_team.value.tid).where('role', [
        'Director of Pro Scouting',
        'Director of College Scouting',
        'Scout'
    ]).get();
    let front_office = Staff.query().where('team_id', selected_team.value.tid).where('role', [
        'Owner',
        'Chief Executive Officer',
        'President',
        'General Manager'
    ]).get();

    return {
        coaches: coaches,
        medical: medical,
        scouting: scouting,
        front_office: front_office
    }
})
const transformStaffToTreeData = (staffGroup, categoryKey) => {
    const customerData = customers.value;

    return staffGroup.map((staff, index) => ({
        key: `${categoryKey}-${index}`,
        data: {
            id: staff.id,
            category: "",
            role: staff.role,
            first_name: staff.first_name,
            last_name: staff.last_name,
            age: Utilities.randInt(30, 70),
            contract_length: Utilities.randInt(1, 5),
            contract_amount: formatCurrency(Utilities.randInt(100000, 1000000)),
            image: customerData[Math.floor(Math.random() * customerData.length)].representative.image,
            ratings: staff
        }
    }));
};

const onEdit = () => {
    if (clickedTask.value) {
        clickedTask.value = null;
    }
}

const handleDelete = () => {
    if (clickedTask.value) {
        clickedTask.value = null;
    }
}

const updateTreeValue = () => {
    const staffData = filteredStaff.value;

    staffTreeValue.value = [
        {
            key: "0",
            data: {
                category: "Board",
                role: "",
                first_name: "",
                last_name: "",
                age: "",
                image: ""
            },
            children: transformStaffToTreeData(staffData.front_office, "0")
        },
        {
            key: "1",
            data: {
                category: "Coaches",
                role: "",
                first_name: "",
                last_name: "",
                age: "",
                image: ""
            },
            children: transformStaffToTreeData(staffData.coaches, "1")
        },
        {
            key: "2",
            data: {
                category: "Scouting",
                role: "",
                first_name: "",
                last_name: "",
                age: "",
                image: ""
            },
            children: transformStaffToTreeData(staffData.scouting, "2")
        },
        {
            key: "3",
            data: {
                category: "Medical",
                role: "",
                first_name: "",
                last_name: "",
                age: "",
                image: ""
            },
            children: transformStaffToTreeData(staffData.medical, "3")
        },
    ];
};

watch(filteredStaff, updateTreeValue, { immediate: true });

const saveStaff = async () => {
    if (staffEditObject.value) {
        const staff = await Staff.update({
            id: staffEditObject.value.id,
            first_name: staffEditObject.value.first_name,
            last_name: staffEditObject.value.last_name,
            birth_year: staffEditObject.value.birth_year,
            leadership: staffEditObject.value.leadership,
            adaptability: staffEditObject.value.adaptability,
            ambition: staffEditObject.value.ambition,
            discipline: staffEditObject.value.discipline,
            motivation: staffEditObject.value.motivation,
            rookie_player_management: staffEditObject.value.rookie_player_management,
            veteran_player_management: staffEditObject.value.veteran_player_management,
            contract_negotiations: staffEditObject.value.contract_negotiations,
            play_calling_ability: staffEditObject.value.play_calling_ability,
            gameplan: staffEditObject.value.gameplan,
            data_analysis: staffEditObject.value.data_analysis,
            player_ability_analysis: staffEditObject.value.player_ability_analysis,
            player_potential_analysis: staffEditObject.value.player_potential_analysis,
            staff_ability_analysis: staffEditObject.value.staff_ability_analysis,
            offensive_technical: staffEditObject.value.offensive_technical,
            defensive_technical: staffEditObject.value.defensive_technical,
            throwing_technical: staffEditObject.value.throwing_technical,
            hands_technical: staffEditObject.value.hands_technical,
            routes_technical: staffEditObject.value.routes_technical,
            blocking_technical: staffEditObject.value.blocking_technical,
            tackling_technical: staffEditObject.value.tackling_technical,
            coverage_technical: staffEditObject.value.coverage_technical,
            kicking_technical: staffEditObject.value.kicking_technical,
            punting_technical: staffEditObject.value.punting_technical,
            athletic_training: staffEditObject.value.athletic_training,
            medical_training: staffEditObject.value.medical_training
        })
        staffEditObject.value = staff.staff[0];
        console.log(staffEditObject.value)
        databaseController.saveDefaultDatabase();
    }
}

const toggle = (event, node) => {
    console.log(node)
    staffEditObject.value = Staff.find(node.data.id)
    menu.value.toggle(event);
};

const toggle_player_edit = (event, node) => {
    console.log(node);
    playerEditObject.value = node;
    openPlayerEdit();
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openPlayerEdit = () => {
    playerDialog.value = true;
}

// ********** OLD SHIT *****************
const openNew = () => {
    product.value = {};
    submitted.value = false;
    staffDialog.value = true;
};

const hideDialog = () => {
    staffDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};

const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};

const getBadgeSeverity = (status) => {
    const stockStatus = {
        OUTOFSTOCK: 'danger',
        LOWSTOCK: 'warning',
        INSTOCK: 'success',
    };

    return stockStatus[status];
};
// ************************************
</script>