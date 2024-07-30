<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid grid-nogutter align-items-center mb-2">
                <div
                    class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
                    :class="{ 'border-primary border-2 text-primary': chart === 'offense' }"
                    @click="setDepthChart('offense')"
                >
                    Offense
                </div>
                <div
                    class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
                    :class="{ 'border-primary border-2 text-primary': chart === 'defense' }"
                    @click="setDepthChart('defense')"
                >
                    Defense
                </div>
                <div
                    class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
                    :class="{ 'border-primary border-2 text-primary': chart === 'special' }"
                    @click="setDepthChart('special')"
                >
                    Special Teams
                </div>
            </div>

            <CustomTabPanel contentClass="w-1/2">
                <div v-if="chart === 'defense'" class="surface-ground px-0 py-5">

                    <!-- #region Backfield Defense -->
                    <div class="grid grid-nogutter gap-2 justify-content-center mb-4">
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">FS</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">SS</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Midfield Defense -->
                    <div class="grid grid-nogutter gap-2 justify-content-center mb-4">
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">LOLB</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">MLB1</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">MLB2</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">ROLB</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Frontline Defense -->
                    <div class="grid grid-nogutter gap-2 justify-content-center mb-4">
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">CB2</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">LE</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">DT1</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">DT2</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">RE</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="p-3">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">&nbsp;</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                        <div class="text-900 font-medium text-sm">&nbsp;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">CB3</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">CB1</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <!-- #endregion -->
                </div>

                <div v-if="chart === 'offense'" class="surface-ground px-0 py-5">

                    <!-- #region Frontline Offense -->
                    <div class="grid grid-nogutter gap-2 justify-content-center mb-4">
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">WR2</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1"></div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">LT</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">LG</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">C</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">RG</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">RT</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1 mt-4">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">TE</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1"></div>
                        <div class="col-12 md:col-6 lg:col-1 mt-4">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">WR3</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-12 md:col-6 lg:col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">WR1</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Midfield Offense -->
                    <div class="grid grid-nogutter gap-2 justify-content-center">
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-2">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">FB</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-2">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">QB</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1">
                            <div class="surface-card shadow-2 p-3 border-round-xl">
                                <div class="flex justify-content-between mb-2">
                                    <div>
                                        <span class="block text-900 text-xl font-medium mt-2">RB</span>
                                    </div>
                                    <div class="flex align-items-center justify-content-center border-round" style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-unlock text-500 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div class="flex flex-row justify-content-between">
                                        <div class="text-900 font-medium text-sm">F. LastName</div>
                                        <div class="text-900 font-medium text-sm">72</div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                        <div class="col-1"></div>
                    </div>
                    <!-- #endregion -->

                </div>
            </CustomTabPanel>

        </div>
    </div>
</template>

<script>
import OrganizationChart from 'primevue/organizationchart';
import CustomTabView from '@/components/CustomTabView.vue';
import CustomTabPanel from '@/components/CustomTabPanel.vue';
import World from "../../models/World";
import League from "../../models/League";
import User from "../../models/User";
import Team from "../../models/Team";
import Player from "../../models/Player";
import { DEPTH_CHART_POSITIONS, POSITIONS, OFF_POSITIONS, DEF_POSITIONS } from '@/data/constants';

export default {
    components: {
        OrganizationChart,
        CustomTabView,
        CustomTabPanel
    },
    data() {
        return {
            POSITIONS,
            OFF_POSITIONS,
            DEF_POSITIONS,
            DEPTH_CHART_POSITIONS,
            selectedTeam: 0,
            filtered_positions: [],
            idFrozen: false,
            chart: 'offense',
            nestedMenuitems: [
                {
                    label: 'Offense',
                    icon: 'pi pi-fw pi-users',
                },
                {
                    label: 'Defense',
                    icon: 'pi pi-fw pi-calendar-plus',
                },
                {
                    label: 'Special Teams',
                    icon: 'pi pi-fw pi-calendar-plus',
                }
            ],
            documentStyle: getComputedStyle(document.documentElement),
            textColor: '#212121',
            chartOptions: {
                animation: {
                    duration: 0,
                },
                responsive: true,
                maintainAspectRatio: false,
                cutout: '90%',
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057',
                        },
                    },
                },
            }
        };
    },
    methods: {
        togglePosition(pos) {
            const index = this.filtered_positions.indexOf(pos);
            if (index > -1) {
                this.filtered_positions.splice(index, 1);
            } else {
                this.filtered_positions.push(pos);
            }
        },
        getPositionCount(pos) {
            if (this.user) {
                return this.user.team?.players.filter(player => player.ratings.position === pos).length;
            }
            return 0;
        },
        isPositionSelected(pos) {
            return this.filtered_positions.includes(pos);
        },
        setDepthChart(chart) {
            this.chart = chart;
        }
    },
    computed: {
        user: {
            /* By default get() is used */
            get() {
                return User.query().with('team.players.*').first()
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updateUser', value)
            }
        },
        world: {
            /* By default get() is used */
            get() {
            return World.query().first()
            },
            /* We add a setter */
            set(value) {
            this.$store.commit('updateWorld', value)
            }
        },
        teams: {
            /* By default get() is used */
            get() {
                return Team.query().with('players.*').orderBy('name').all()
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updateTeams', value)
            }
        },
        players: {
            /* By default get() is used */
            get() {
                return Player.query().with('team').all();
            },
            /* We add a setter */
            set(value) {
                this.$store.commit('updatePlayers', value)
            }
        },
        filteredPlayers() {
            if (this.user.team) {
                if (this.filtered_positions.length === 0) {
                    return this.user.team.players;
                } else {
                    return this.user.team.players.filter(player =>
                        this.filtered_positions.includes(player.ratings.position)
                    );
                }
            }
            return [];
        },
    }
}

</script>
